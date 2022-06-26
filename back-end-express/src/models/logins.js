const Sequelize = require("sequelize");
const sequelize = require("../db/sequelize");

const Login = sequelize.define(
  "Login",
  {
    id: {
      type: Sequelize.INTEGER,
      unique: true,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    deleted: {
      required: true,
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      unique: false,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Login
