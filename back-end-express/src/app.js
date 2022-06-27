const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../config/.env") });
const express = require("express");
const contactoRouter = require('./routers/contacto')
const entidadeRouter = require('./routers/entidade')
const oportunidadesRouter = require('./routers/oportunidade')
const utilizadorRouter = require('./routers/utilizador')

const app = express();

app.use(express.json());
app.use('/contactos',contactoRouter)
app.use('/entidades',entidadeRouter)
app.use('/oportunidades',oportunidadesRouter)
app.use('/utilizador',utilizadorRouter)

module.exports = app;
