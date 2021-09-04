const { DB_HOST, DB_DATABASE, DB_USER, DB_PASSWORD, NODE_ENV } = process.env;

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialect: 'postgres',
  dialectOptions: {
    options: {
      useUTC: true,
      dateFirst: 1,
    },
  },
  define: {
    timestamps: false,
  },
  logging: NODE_ENV !== 'production' && console.log,
});
// console.log(typeof new Sequelize().host);
module.exports = sequelize;
