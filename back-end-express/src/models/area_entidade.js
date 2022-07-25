const Sequelize = require("sequelize");
const sequelize = require("../db/sequelize");

const AreaEntidade = sequelize.define(
  "Area_Entidade",
  {
    id: {
      type: Sequelize.INTEGER,
      unique: true,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    area:{
        required:true,
        type:Sequelize.ENUM("Informática", "Gestão", "Contabilidade", "Marketing"),
        allowNull:false,
        unique:false,
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

module.exports = AreaEntidade;
