const { validationResult } = require("express-validator");

const validateFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors);
  next();
};

/**
 * Middleware to check if the user is a buyer, must be used after the auth middleware verifyToken
 * @returns  403 if the user is not a buyer
 */
const isBuyer = (req, res, next) => {
  if (req.user.type !== "buyer") {
    return res.status(403).send({
      message: "Only buyers are allowed to do this action",
    });
  }
  next();
};

module.exports = {
  validateFields,
  isBuyer,
};
