// Import required modules and setup the database and ORM
const { db, Orm } = require("../lib/orm");
const { Agreement } = require("./aggreement");
const jwt = require("jsonwebtoken");

const config = require("@config/auth");

// Define the Account model with its attributes
const Account = db.define("Account", {
  firstName: {
    type: Orm.STRING,
    allowNull: false,
  },
  lastName: {
    type: Orm.STRING,
    allowNull: false,
  },
  profession: {
    type: Orm.STRING,
    allowNull: false,
  },
  balance: {
    type: Orm.DECIMAL(12, 2),
  },
  password: {
    type: Orm.STRING,
    allowNull: false,
  },
  email: {
    type: Orm.STRING,
    allowNull: false,
    unique: true,
  },
  admin: {
    type: Orm.BOOLEAN,
    defaultValue: false,
  },
  type: {
    type: Orm.ENUM("buyer", "supplier"),
  },
});

// generate JWTtoken for the user
Account.prototype.generateToken = function () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60); // token valid for 60 days

  return jwt.sign(
    {
      email: this.email,
      id: this._id,
      exp: parseInt(expirationDate.getTime() / 1000, 10),
    },
    config.secret
  );
};

// Set up associations between the Account and Agreement models
Agreement.belongsTo(Account, { as: "Supplier" });
Agreement.belongsTo(Account, { as: "Buyer" });
Account.hasMany(Agreement, { as: "Supplier", foreignKey: "SupplierId" });
Account.hasMany(Agreement, { as: "Buyer", foreignKey: "BuyerId" });

// Export the Account model to be used in other parts of the application
module.exports = {
  Account,
};
