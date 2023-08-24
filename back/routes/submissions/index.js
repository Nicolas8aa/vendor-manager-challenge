const express = require("express");
const router = express.Router();

const Sequelize = require("sequelize");
const { or, eq } = Sequelize.Op;

const { verifyToken } = require("@middlewares/auth");
const { Submission } = require("@models/submissions");
const { Agreement } = require("@models/aggreement");
const { Account } = require("@models/accounts");
const { db } = require("@lib/orm");

// GET /submissions/unpaid - Get all unpaid submissions for a user (either a buyer or supplier) but only for active agreements.

// POST /submissions/:submission_id/pay - Implement this API to allow buyers to pay for a submission. A buyer can only pay if their balance is greater than or equal to the amount to pay. The amount should be moved from the buyer's balance to the supplier's balance.

const isBuyer = (req, res, next) => {
  if (req.user.type !== "buyer") {
    return res.status(403).send({
      message: "Only buyers can pay for submissions",
    });
  }
  next();
};

router.use(verifyToken);

router.get("/unpaid", async (req, res) => {
  try {
    const submissions = await Submission.findAll({
      where: {
        paid: false,
      },
      include: [
        {
          model: Agreement,
          where: {
            [or]: [{ BuyerId: req.user.id }, { SupplierId: req.user.id }],
            status: {
              [eq]: "in_progress",
            },
          },
        },
      ],
    });

    res.send(submissions);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

router.post("/:submission_id/pay", [isBuyer], async (req, res) => {
  let transaction;

  try {
    transaction = await db.transaction();

    const submission = await Submission.findOne({
      where: {
        id: req.params.submission_id,
        paid: false,
      },
      include: [
        {
          model: Agreement,
          where: { BuyerId: req.user.id },
          include: [
            {
              model: Account,
              as: "Buyer",
              attributes: ["id", "balance"],
            },
            {
              model: Account,
              as: "Supplier",
              attributes: ["id", "balance"],
            },
          ],
        },
      ],
    });

    if (!submission) {
      return res.status(404).send();
    }

    const agreement = submission.Agreement;

    const buyer = agreement.Buyer;
    const supplier = agreement.Supplier;

    if (agreement.BuyerId !== req.user.id) {
      return res.status(403).send();
    }

    if (buyer.balance < submission.price) {
      return res.status(403).send({
        message: "Insufficient balance",
      });
    }

    buyer.balance -= submission.price;
    supplier.balance += submission.price;

    await buyer.save({ transaction });
    await supplier.save({ transaction });

    submission.paid = true;
    submission.paymentDate = new Date();
    await submission.save({ transaction });

    await transaction.commit();
    res.send("Payment successful");
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    res.status(500).send();
  }
});

module.exports = router;
