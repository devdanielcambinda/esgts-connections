const Sequelize = require("sequelize");
const sequelize = require("../db/sequelize");

const Contacto = sequelize.define(
  "Contacto",
  {
    id: {
      type: Sequelize.INTEGER,
      unique: true,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      required: true,
      type: Sequelize.STRING,
      unique: false,
      allowNull: false,
    },
    email: {
      required: true,
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    telefone: {
      required: true,
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    cargo_principal: {
      required: true,
      type: Sequelize.STRING,
      unique: false,
      allowNull: false,
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

module.exports = Contacto