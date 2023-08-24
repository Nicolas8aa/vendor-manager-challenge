const jwt = require("jsonwebtoken");
const config = require("@config/auth.js");

const { Account } = require("@models/accounts.js");

const verifyToken = async (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  try {
    const decoded = jwt.verify(token, config.secret);
    req.userId = decoded.id;
    const user = await Account.findOne({
      where: {
        id: req.userId,
      },
    });
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).send({
      message: "Unauthorized!",
    });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.admin) {
    next();
    return;
  }

  res.status(403).send({
    message: "Require Admin Role!",
  });
  return;
};

module.exports = {
  verifyToken,
  isAdmin,
};
