const express = require("express");
const router = express.Router();

const { Account } = require("@models/accounts");
const { Submission } = require("@models/submissions");
const { Agreement } = require("@models/aggreement");
const { db } = require("@lib/orm");
const { isBuyer } = require("@middlewares/validate");
const { verifyToken } = require("@middlewares/auth");

const { Op } = require("sequelize");

router.use(verifyToken);

router.post("/deposit/:accountId", [isBuyer], async (req, res) => {
  const { accountId } = req.params;
  const depositAmount = req.body.amount;

  const buyer = req.user;

  if (buyer.id != accountId) {
    return res.status(403).send({
      message: "You can't deposit money into another account",
    });
  }

  // validate amount
  if (depositAmount <= 0) {
    return res.status(400).send({
      message: "Amount must be greater than 0",
    });
  }

  let transaction;

  try {
    transaction = await db.transaction();
    // lock the buyer account
    const buyer = await Account.findOne({
      where: {
        id: accountId,
      },
      lock: transaction.LOCK.UPDATE,
      transaction,
    });

    if (!buyer) {
      throw new Error("Buyer not found");
    }

    const totalOwedAmount = await Submission.sum("price", {
      where: {
        paid: false,
      },
      include: [
        {
          model: Agreement,
          where: {
            BuyerId: buyer.id,
            status: "in_progress",
          },
        },
      ],
      transaction,
    });

    console.log(totalOwedAmount);

    const maxAllowedDeposit = totalOwedAmount * 0.1;

    if (totalOwedAmount > 0 && depositAmount > maxAllowedDeposit) {
      throw new Error(
        "You can't deposit more than 10% of your total submissions owed amount"
      );
    }

    buyer.balance += depositAmount;
    await buyer.save({ transaction });

    await transaction.commit();

    return res.status(200).send({
      message: "Money deposited successfully",
      balance: buyer.balance,
    });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }

    return res.status(500).send({
      message: error.message || "Error depositing money",
    });
  }
});

module.exports = router;
