var express = require("express");
var router = express.Router();

router.use("/agreements", require("./agreements"));
router.use("/submissions", require("./submissions"));
router.use("/balances", require("./balances"));
router.use("/admin", require("./admin"));
router.use("/auth", require("./auth"));

router.use("*", (_, res) => {
  res.status(404).send();
});

module.exports = router;
