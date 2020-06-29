const db = require('./config/database');

const sequelize = db.dbConfiguration;

const connect = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
  } catch (error) {
    console.error(error.message);
    process.exit(-1);
  }
};

const database = {
  connect,
};

module.exports = database;
