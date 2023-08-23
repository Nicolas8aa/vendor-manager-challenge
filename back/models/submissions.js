// Import required modules and setup the database and ORM
const { db, Orm } = require('../lib/orm');

// Define the Submission model with its attributes
const Submission = db.define('Submission', {
  description: {
    type: Orm.TEXT,
    allowNull: false,
  },
  price: {
    type: Orm.DECIMAL(12, 2),
    allowNull: false,
  },
  paid: {
    type: Orm.BOOLEAN,
    defaultValue: false,
  },
  paymentDate: {
    type: Orm.DATE,
  },
});

// Export the Submission model to be used in other parts of the application
module.exports = {
  Submission,
};
