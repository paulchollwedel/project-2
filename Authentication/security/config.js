require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(
      'instaArt',
      process.env.DB_USERNAME,
      process.env.DB_PASSWORD,
      {
        host: 'localhost',
        dialect: 'mysql'
      }
    );

module.exports = sequelize;