const express = require("express");
const router = express.Router();

const Sequelize = require("sequelize");
const { or, ne } = Sequelize.Op;

// GET /submissions/unpaid - Get all unpaid submissions for a user (either a buyer or supplier) but only for active agreements.

// POST /submissions/:submission_id/pay - Implement this API to allow buyers to pay for a submission. A buyer can only pay if their balance is greater than or equal to the amount to pay. The amount should be moved from the buyer's balance to the supplier's balance.

router.get("/unpaid", async (req, res) => {});

router.post("/:submission_id/pay", async (req, res) => {});

module.exports = router;
