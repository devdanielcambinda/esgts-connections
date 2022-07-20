const Utilizador = require('../models/utilizador');
const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy({usernameField:'email', passwordField:'password'}, async function (email, password, done) {
    try {
      const utilizador = await Utilizador.findOne({ where: { email } });
      
      if ( !utilizador) {
        return done(null, false, { message: "Password e/ou email incorreto(s)." });
      }
      if(utilizador.deleted === true){
        return done(null, false, { message: "Utilizador apagado" });
      }
      const passVal = await  utilizador.validPassword(password);
      if(!passVal){
        return done(null, false, { message: "Password e/ou email incorreto(s)." });
      }

      return done(null, utilizador);
    } catch (err) {
      return done(err);
    }
  })
);

 passport.serializeUser(function (utilizador, done) {
  done(null, utilizador.id);
});

passport.deserializeUser(function (id, done) {
  Utilizador.findByPk(id).then(function (utilizador) {
    done(null, utilizador);
  }); 
})

module.exports = passport
