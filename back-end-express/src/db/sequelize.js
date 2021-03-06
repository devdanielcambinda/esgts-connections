const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../config/.env") });
const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DB_URI);

module.exports = sequelize;
