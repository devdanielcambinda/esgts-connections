const express = require('express')
const Contacto = require('../models/contacto')

const router = new express.Router()

router.post('/', async (req,res) => {
    
    const receivedKeys = Object.keys(req.body);
    const requiredKeys = [
      "nome",
      "morada",
      "cod_postal",
      "NIF",
      "localidade",
      "dimensao",
      "areas",
    ];

    const isValidOperation = receivedKeys.every((key) =>
      requiredKeys.includes(key)
    );

    if (!isValidOperation) {
      return res.status(400).send({ error: "Erro a criar entidade!" });
    }
})

router.get

module.exports = router