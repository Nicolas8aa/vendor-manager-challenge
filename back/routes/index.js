var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.use("/agreements", require("./agreements"));
router.use("/submissions", require("./submissions"));
router.use("/balances", require("./balances"));
router.use("/admin", require("./admin"));

router.use("*", (_, res) => {
  res.status(404).send();
});

module.exports = router;
