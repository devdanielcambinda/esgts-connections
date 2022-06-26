const Sequelize = require("sequelize");
const sequelize = require("../db/sequelize");

const OutrasMoradasEntidades = sequelize.define(
  "Outras_moradas_entidade",
  {
    id: {
      type: Sequelize.INTEGER,
      unique: true,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    morada: {
      required: true,
      type: Sequelize.STRING(250),
      unique: false,
      allowNull: false,
    },
    cod_postal: {
      required: true,
      type: Sequelize.STRING(20),
      unique: false,
      allowNull: false,
    },
    localidade: {
      required: true,
      type: Sequelize.STRING(30),
      unique: false,
      allowNull: false,
    },
    deleted: {
      required: true,
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      unique: false,
      allowNull: false,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = OutrasMoradasEntidades;
