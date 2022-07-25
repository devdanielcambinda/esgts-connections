const Sequelize = require("sequelize");
const sequelize = require("../db/sequelize");

// set table
// array de areas para não criar outra table só com um enum
const Entidade = sequelize.define(
  "Entidade",
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
    NIF: {
      required: true,
      type: Sequelize.INTEGER,
      unique: false,
      allowNull: false,
    },
    localidade: {
      required: true,
      type: Sequelize.STRING(30),
      unique: false,
      allowNull: false,
    },
    dimensao: {
      required: true,
      type: Sequelize.ENUM("<= 1M", "<= 10M", "> 10M"),
      unique: false,
      allowNull: false,
    },
    foto: {
      required: false,
      type: Sequelize.BLOB,
      unique: false,
      allowNull: true,
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

module.exports = Entidade;
