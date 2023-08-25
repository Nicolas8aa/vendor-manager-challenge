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

router.get("/balance", async (req, res) => {
  res.send({ balance: req.user.balance });
});

class ExtendedError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

router.post("/deposit/:accountId", [isBuyer], async (req, res) => {
  const { accountId } = req.params;
  let depositAmount = req.body.amount;

  let transaction;

  try {
    if (req.user.id != accountId) {
      throw new ExtendedError(
        "You can't deposit money into another account",
        403
      );
    }
    // validate deposit amount is not negative or zero and is a number

    depositAmount = parseFloat(depositAmount);

    if (!depositAmount) {
      throw new ExtendedError("Deposit amount is required", 400);
    }
    if (depositAmount <= 0 || isNaN(depositAmount)) {
      throw new ExtendedError("Deposit amount must be a positive number", 400);
    }

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
      throw new ExtendedError("Buyer not found", 404);
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

    const maxAllowedDeposit = totalOwedAmount * 0.1;

    if (totalOwedAmount > 0 && depositAmount > maxAllowedDeposit) {
      throw new ExtendedError(
        "You can't deposit more than 10% of your total submissions owed amount",
        400
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

    return res.status(error.status || 500).send({
      message: error.message || "Error depositing money",
    });
  }
});

module.exports = router;
