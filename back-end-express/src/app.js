const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../config/.env") });
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const passport = require('./passport/passport')
const entidadeRouter = require('./routers/entidade')
const utilizadorRouter = require('./routers/utilizador')
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//session
app.use(
  session({
    secret: process.env.SESSION_SECRET, // session secret
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60  , // 1 hour
      sameSite: "strict",
    },
  })
);

//passport 
app.use(passport.initialize());
app.use(passport.session());


//routes
app.use("/api/entidades", entidadeRouter);
app.use("/api/utilizador", utilizadorRouter);

module.exports = app;
