const express = require("express");
const router = express.Router();

//POST /balances/deposit/:accountId - Implement the API to allow buyers to deposit money into their balance. A buyer can't deposit more than 10% of their total submissions to pay at the moment of deposit.

router.post("/deposit/:accountId", async (req, res) => {});

module.exports = router;
