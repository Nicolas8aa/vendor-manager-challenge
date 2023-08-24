const express = require("express");
const router = express.Router();

// GET /admin/best-supplier-profession?start=<date>&end=<date> - Implement this API to return the best buyer profession that earned the most money (sum of submissions paid) for any supplier who worked in the specified time range.

// GET /admin/best-buyers?start=<date>&end=<date>&limit=<integer> - Implement this API to return the buyers who paid the most for submissions in the given time period. The result should be limited based on the query parameter limit, with the default limit set to 3.

router.get("/best-supplier-profession", async (req, res) => {});

router.get("/best-buyers", async (req, res) => {});

module.exports = router;
