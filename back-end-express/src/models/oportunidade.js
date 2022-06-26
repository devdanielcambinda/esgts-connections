const Sequelize = require("sequelize");
const sequelize = require("../db/sequelize");

const Oportunidade = sequelize.define(
  "Oportunidade",
  {
    id: {
      type: Sequelize.INTEGER,
      unique: true,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      required: true,
      type: Sequelize.STRING,
      unique: false,
      allowNull: false,
    },
    descricao: {
      required: true,
      type: Sequelize.STRING,
      unique: false,
      allowNull: false,
    },
    tipo_de_oportunidade: {
      required: true,
      type: Sequelize.ENUM("Estágio","Workshop","Trabalho"),
      unique: false,
      allowNull: false,
    },
    data_de_inicio: {
      required: true,
      type: Sequelize.DATEONLY,
      allowNull: false,
      unique: false,
    },
    data_de_fim: {
      required: true,
      type: Sequelize.DATEONLY,
      allowNull: false,
      unique: false,
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

module.exports = Oportunidade;
