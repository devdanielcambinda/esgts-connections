const express = require("express");
const Entidade = require("../models/entidade");
const Contacto = require("../models/contacto");
const Oportunidade = require("../models/oportunidade");

const router = new express.Router();

router.post("/", async (req, res) => {
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

  try {
    const entidade = await Entidade.create({
        nome: req.body.nome,
    })
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/contacto", async (req, res) => {
    
})

router.post('/contacto/oportunidade', async (req,res) => {

})

module.exports = router;
