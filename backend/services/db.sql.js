/* eslint-disable linebreak-style */
const mysql = require("mysql");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB,
  connectionLimit: 10,
};

const connection = mysql.createPool(dbConfig);

module.exports = {connection};
