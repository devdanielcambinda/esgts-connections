const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../config/.env") });
const app = require("./app");
const port = process.env.PORT || 3007;
const sequelize = require("./db/sequelize");
const Entidade = require('./models/entidade')
const OutrasMoradasEntidade = require('./models/outras_moradas_entidades')
const Contacto = require('./models/contacto')
const Oportunidade = require('./models/oportunidade')
const Utilizador = require('./models/utilizador')
const Login = require('./models/logins')

//entidade - outras moradas
Entidade.hasMany(OutrasMoradasEntidade)
OutrasMoradasEntidade.belongsTo(Entidade)
// entidade - contactos
Entidade.hasMany(Contacto)
Contacto.belongsTo(Entidade)
//oportunidades - contactos
Contacto.hasMany(Oportunidade)
Oportunidade.belongsTo(Contacto)
//utilizador - login
Utilizador.hasMany(Login)
Login.belongsTo(Utilizador)

app.listen(port, async () => {
  console.log(`Server is up on port ${port}`);
  try{
        await sequelize.sync(
            //{force: true}
        )
        console.log('Connected to database')
    }catch(error){
        console.error(`Error: Cannot connect to database ${error}`)
    }
});
