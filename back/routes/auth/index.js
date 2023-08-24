const express = require("express");
const router = express.Router();

const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs");

const { check } = require("express-validator");

const { Account } = require("@models/accounts.js");
const { validateFields } = require("@middlewares/validate");

// Create endpoints to register and login users.
router.post(
  "/register",
  [
    check("firstName", "First name is required").not().isEmpty(),
    check("lastName", "Last name is required").not().isEmpty(),
    check("profession", "Profession is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
    check("type", "Please enter a valid type").isIn(["buyer", "supplier"]),
    validateFields,
  ],
  async (req, res) => {
    const { firstName, lastName, profession, email, password, type, admin } =
      req.body;

    try {
      // check if the user already exists

      let user = await Account.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!",
        });
        return;
      }

      user = await Account.create({
        firstName,
        lastName,
        profession,
        email,
        type,
        admin,
        password: bcrypt.hashSync(password, 8),
      });

      res.send(user);
    } catch (error) {
      res.status(500).send();
    }
  }
);

router.post("/login", async (req, res) => {
  try {
    const user = await Account.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid)
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });

    res.send({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      profession: user.profession,
      email: user.email,
      type: user.type,
      admin: user.admin,
      accessToken: user.generateToken(),
    });
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

module.exports = router;
