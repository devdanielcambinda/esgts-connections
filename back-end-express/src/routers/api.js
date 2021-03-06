const express = require("express");
const auth = require("../middleware/auth");
const multer = require("multer");
const sharp = require("sharp");
const Utilizador = require("../models/utilizador");
const Login = require("../models/logins");
const Entidade = require("../models/entidade");
const Contacto = require("../models/contacto");
const Oportunidade = require("../models/oportunidade");
const passport = require("../passport/passport");

const router = new express.Router();

const avatarUploads = multer({
  limits: {
    fileSize: 1000000, // unite: bytes --> 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please insert a image file"));
    }
    cb(undefined, true);
  },
});

router.post("/utilizador",avatarUploads.fields([{name:'avatar',maxCount:1},{name:'foto',maxCount:1}]), async (req, res) => {


  if(req.body.tipoDeConta === "Aluno" || req.body.tipoDeConta === "Professor"){
    const receivedKeys = Object.keys(req.body);
    const requiredKeys = [
      "nome",
      "email",
      "telefone",
      "avatar",
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
      const buffer = await sharp(req.files['avatar'][0].buffer)
        .resize({
          width: 250,
          height: 250,
        })
        .png()
        .toBuffer();

      console.log(req.body);
      console.log(buffer);

      const utilizador = await Utilizador.create({
        nome: req.body.nome,
        email: req.body.email,
        telefone: req.body.telefone,
        avatar: buffer,
        password: req.body.password,
        tipoDePerfil: req.body.tipoDeConta,
        linkLinkedin:
          req.body.linkedinLink.length === 0 ? null : req.body.linkedinLink,
      });

      res.send({ utilizador });
    } catch (e) {
      res.status(400).send(e);
    }
  }

  if (req.body.tipoDeConta === "Externo" && !req.body.entidade) {
    // se for externo e n??o escolher entidade/criar nova entidade

    const receivedKeys = Object.keys(req.body);
    const requiredKeys = [
      //utilizagor
      "nome",
      "email",
      "telefone",
      "avatar",
      "password",
      "tipoDeConta",
      "linkedinLink",
      //contacto
      "cargoPrincipal",
      // entidade
      "nomeEntidade",
      "moradaEntidade",
      "cod_postalEntidade",
      "NIFEntidade",
      "localidadeEntidade",
      "dimensaoEntidade",
      "fotoEntidade",
      "areas",
    ];

    const isValidOperation = receivedKeys.every((key) =>
      requiredKeys.includes(key)
    );

    if (!isValidOperation) {
      return res.status(400).send({ message: "Erro a criar conta" });
    }

    try {
      const bufferAvatar = await sharp(req.files["avatar"][0].buffer)
        .resize({
          width: 250,
          height: 250,
        })
        .png()
        .toBuffer();

      const bufferFoto = await sharp(req.files["foto"][0].buffer)
        .resize({
          width: 250,
          height: 250,
        })
        .png()
        .toBuffer();

      const utilizador = await Utilizador.create({
        nome: req.body.nome,
        email: req.body.email,
        telefone: req.body.telefone,
        avatar: bufferAvatar,
        password: req.body.password,
        tipoDePerfil: req.body.tipoDeConta,
        linkLinkedin:
          req.body.linkedinLink.length === 0 ? null : req.body.linkedinLink,
      });

      const entidade = await Entidade.create({
        nome: req.body.nomeEntidade,
        morada: req.body.moradaEntidade,
        cod_postal: req.body.cod_postalEntidade,
        NIF: req.body.NIFEntidade,
        localidade: req.body.localidadeEntidade,
        dimensao: req.body.dimensaoEntidade,
        foto: bufferFoto,
        areas: req.body.areas,
      })

      const contacto = await Contacto.create({
        nome: req.body.nome,
        email: req.body.email,
        telefone: req.body.telefone,
        cargoPrincipal: req.body.cargoPrincipal,
        EntidadeId: entidade.id,
        UtilizadorId: utilizador.id,
      })

      res.send({ utilizador,entidade,contacto });
    } catch (e) {
      res.status(400).send(e);
    }
  }

  if(req.body.tipoDeConta === "Externo" && req.body.entidade){ // se for externo e escolher entidade j?? existente
    const receivedKeys = Object.keys(req.body);
    const requiredKeys = [
      "nome",
      "email",
      "telefone",
      "avatar",
      "password",
      "tipoDeConta",
      "linkedinLink",
      "cargoPrincipal",
      "entidade", //id da entidade
    ];
    const isValidOperation = receivedKeys.every((key) =>
      requiredKeys.includes(key)
    );

    if (!isValidOperation) {
      return res.status(400).send({ message: "Erro a criar conta" });
    }

    try {
      const buffer = await sharp(req.file.buffer)
        .resize({
          width: 250,
          height: 250,
        })
        .png()
        .toBuffer();

      console.log(req.body);
      console.log(buffer);

      const utilizador = await Utilizador.create({
        nome: req.body.nome,
        email: req.body.email,
        telefone: req.body.telefone,
        avatar: buffer,
        password: req.body.password,
        tipoDePerfil: req.body.tipoDeConta,
        linkLinkedin:
          req.body.linkedinLink.length === 0 ? null : req.body.linkedinLink,
      });

      const contacto = await Contacto.create({
        nome: req.body.nome,
        email: req.body.email,
        telefone: req.body.telefone,
        cargoPrincipal: req.body.cargoPrincipal,
        EntidadeId: req.body.entidade,
        UtilizadorId: utilizador.id,
      })

      res.send({ utilizador,contacto });
    } catch (e) {
      res.status(400).send(e);
    }
  }

});

router.post("/utilizador/login", passport.authenticate("local"), async (req, res) => {
  await Login.create({
    UtilizadorId: req.user.id,
  });

  let utilizadorInfo = {
    email: req.user.email,
    nome: req.user.nome,
  };
  res.send(utilizadorInfo);
});

router.get("/utilizador/me", auth, async (req, res) => {
    res.send(req.user);
})

router.get("/utilizador/me/avatar",auth, async(req,res) =>{

     res.set("Content-Type", "image/png");
     res.send(req.user.avatar);
 
})

router.delete("/utilizador/me", auth, async (req, res) => {

  try {
    req.user.deleted = true;
    await req.user.save();
    req.session.destroy( (err)=>{
      if (err) {
        return next(err);
      }
      res.clearCookie("sessionCookie");
      res.send({ message: "Conta apagada" });
    })
  } catch (error) {
    res.status(500).send({error})
  }
})

router.post("/utilizador/logout", auth, (req, res) => {
  req.logout(req.user, (err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy(function (err) {
      if (err) {
        next(err);
      }
      res.clearCookie("sessionCookie");
      res.send({ message: "Sess??o encerrada" });
  });
  });
  
});

router.get("/entidades",async (req,res) =>{

  try {

    const entidades = await Entidade.findAll({
    where:{
      deleted:false
    }
    })

    res.send(entidades);

  } catch (error) {
    res.status(500).send({error})
  }

})

module.exports = router;
