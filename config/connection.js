const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  'witness_db',
  process.env.DBUSER,
  process.env.DBPW,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  }
);

module.exports = sequelize;