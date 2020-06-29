const Sequelize = require('sequelize');
// const dotenv = require('dotenv');
//
// dotenv.config();
const USERNAME = 'root';
const PASSWORD = 'password';
const DB_NAME = 'cheq';

exports.dbConfiguration = new Sequelize(DB_NAME, USERNAME, PASSWORD, {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
