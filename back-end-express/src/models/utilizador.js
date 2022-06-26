const Sequelize = require("sequelize");
const sequelize = require("../db/sequelize");
const bcrypt = require("bcryptjs");

const Utilizador = sequelize.define(
  "Utilizador",
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
    password: {
      required: true,
      type: Sequelize.STRING,
      allowNull: false,
    },
    telefone: {
      required: true,
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    linkLinkedin: {
      required: false,
      type: Sequelize.STRING,
      unique: false,
      allowNull: true,
      validate: {
        iUrl: true,
        notEmpty: false,
      },
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

Utilizador.beforeSave(async (utilizador, options) => {
  if (utilizador.changed("password")) {
    utilizador.password = await bcrypt.hash(utilizador.password, 10);
  }
});

Utilizador.prototype.validPassword = function (password) {
  return bcrypt.compare(password, this.password);
};
module.exports = Utilizador;