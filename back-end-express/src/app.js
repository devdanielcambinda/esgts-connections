const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../config/.env") });
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const passport = require('./passport/passport')
const api = require('./routers/api')
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//session
app.use(
  session({
    name:"sessionCookie",
    secret: process.env.SESSION_SECRET, // session secret
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly:false,
      maxAge: 1000 * 60 * 60  , // 1 hora
      sameSite: "strict",
    },
  })
);

//passport 
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use("/api", api);

app.get('*', (req, res) => {
  res.status(404).send()
})
app.post('*', (req, res) => {
  res.status(404).send();
})
app.put('*', (req, res) => {
  res.status(404).send();
}) 
app.delete('*', (req, res) => {
  res.status(404).send();
})
app.patch('*', (req, res) => {
  res.status(404).send();
})
module.exports = app;
