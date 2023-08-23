const { Sequelize } = require('sequelize');

const db = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3',
});

module.exports = {
  db,
  Orm: Sequelize,
};
