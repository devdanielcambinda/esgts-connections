const express = require('express')
const auth = require('../middleware/auth')
const Utilizador = require('../models/utilizador')
const Login = require('../models/logins')
const passport = require('../passport/passport')

const router = new express.Router()

router.post('/', async (req, res) => {

    const receivedKeys = Object.keys(req.body)
    const requiredKeys = [
      "nome",
      "email",
      "telefone",
      "password",
      "tipoDeConta",
      "linkedinLink",
    ];
    const isValidOperation = receivedKeys.every((key) =>
      requiredKeys.includes(key)
    );

    if (!isValidOperation) {
      return res.status(400).send({ message: "Erro a criar conta" });
    }

    try {
        const utilizador = await Utilizador.create({
          nome: req.body.nome,
          email: req.body.email,
          telefone: req.body.telefone,
          password: req.body.password,
          tipoDePerfil: req.body.tipoDeConta,
          linkLinkedin: req.body.linkLinkedin
        });

        res.send({utilizador})
    } catch (e) {
      res.status(400).send(e);
    }
})

router.post('/login',passport.authenticate('local'), async (req, res) => {

    await Login.create({
      UtilizadorId: req.user.id,
    })

    let utilizadorInfo = {
      email: req.user.email,
      nome: req.user.nome,
    };
    res.send(utilizadorInfo);

})

router.post('/logout',auth, (req,res) => {
  req.logout();
  res.send({message: "Sessão encerrada"})
})

module.exports = router