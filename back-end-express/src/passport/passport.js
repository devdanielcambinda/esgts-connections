const Utilizador = require('../models/utilizador');
const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy({usernameField:'email', passwordField:'password'}, async function (email, password, done) {
    try {
      const utilizador = await Utilizador.findOne({ where: { email } });
      if (!user) {
        return done(null, false, { message: "Incorrect email." });
      }
      const passVal = await  utilizador.validPassword(password);
      if (!passVal) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    } catch (err) {
      cin
      return done(err);
    }
  })
);


 passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findByPk(id).then(function (user) {
    done(null, user);
  }); 
})

module.exports = passport
