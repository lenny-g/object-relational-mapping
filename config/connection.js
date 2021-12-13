const Sequelize = require("sequelize");

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;

const dbOptions = {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
  logging: false,
};

const sequelize = new Sequelize(
  "ecommerce_db",
  "root",
  "Password123!!",
  dbOptions
);

module.exports = sequelize;
