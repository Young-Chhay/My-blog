const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

// create connection to our db with process.env.JAWSBC_URL setup to host server on Heruko. 
if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
  } else {
    sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
      }
    );
  }
  
  module.exports = sequelize;

  // what do I do 
  