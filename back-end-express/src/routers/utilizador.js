const express = require('express')
const Utilizador = require('../models/utilizador')
const Perfil = require('../models/perfil')
const Login = require('../models/logins')

const router = new express.Router()

router.post('/', async (req, res) => {

    console.log(req.body)
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
      return res.status(400).send({ error: "Error creating account!" });
    }

    try {
        const utilizador = await Utilizador.create({
            nome: req.body.nome,
            email: req.body.email,
            telefone: req.body.telefone,
            password: req.body.password,
            linkLinkedin: req.body.linkLinkedin,
        })

        const perfil = await Perfil.create({
          tipoDePerfil: req.body.tipoDeConta,
          UtilizadorId: utilizador.id,
        });

        res.send({utilizador, perfil})
    } catch (e) {
      res.status(400).send(e);
    }
})

module.exports = router