const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../config/.env") });
const express = require("express");
const cors = require("cors");
const contactoRouter = require('./routers/contacto')
const entidadeRouter = require('./routers/entidade')
const oportunidadesRouter = require('./routers/oportunidade')
const utilizadorRouter = require('./routers/utilizador')

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/contactos',contactoRouter)
app.use("/api/entidades", entidadeRouter);
app.use("/api/oportunidades", oportunidadesRouter);
app.use("/api/utilizador", utilizadorRouter);

module.exports = app;
