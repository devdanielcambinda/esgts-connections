const path = require("path");
const express = require("express");
const app = express();

require("dotenv").config({ path: path.join(__dirname, "../config/.env") });

app.use(express.json());

module.exports = app;
