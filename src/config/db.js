const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize_auth = new Sequelize(process.env.DB_NAME_AUTH, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false 
      }
    },
    logging: true 
  });

const sequelize_employee = new Sequelize(process.env.DB_NAME_EMPLOYEE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false 
      }
    },
    logging: true
  });


module.exports = { sequelize_auth, sequelize_employee };
