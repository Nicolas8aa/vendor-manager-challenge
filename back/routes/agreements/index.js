const express = require("express");
const router = express.Router();

const Sequelize = require("sequelize");
const { or, ne } = Sequelize.Op;
const { Agreement } = require("@models/aggreement");
const { verifyToken } = require("@middlewares/auth");

// GET /agreements/:id - Create an endpoint that return the agreement only if it belongs to the calling account.

// GET /agreements - Return a list of agreements belonging to the user (buyer or supplier) where the agreements are not terminated.

router.use(verifyToken);

router.get("/", async (req, res) => {
  try {
    const agreements = await Agreement.findAll({
      where: {
        [or]: [{ BuyerId: req.user.id }, { SupplierId: req.user.id }],
        status: {
          [ne]: "terminated",
        },
      },
    });
    res.send(agreements);
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/:id", async (req, res) => {
  try {
    const agreement = await Agreement.findOne({
      where: {
        id: req.params.id,
        [or]: [{ BuyerId: req.user.id }, { SupplierId: req.user.id }],
      },
    });
    if (!agreement) {
      return res.status(404).send();
    }
    res.send(agreement);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
