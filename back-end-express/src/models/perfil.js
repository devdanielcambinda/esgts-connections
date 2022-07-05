const Sequelize = require("sequelize");
const sequelize = require("../db/sequelize");

const Perfil = sequelize.define(
  "Perfil",
  {
    id: {
      type: Sequelize.INTEGER,
      unique: true,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    tipoDePerfil: {
      required: true,
      type: Sequelize.ENUM("Aluno", "Professor", "Externo"),
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

module.exports = Perfil;
