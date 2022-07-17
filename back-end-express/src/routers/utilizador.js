const express = require("express");
const auth = require("../middleware/auth");
const multer = require("multer");
const sharp = require("sharp");
const Utilizador = require("../models/utilizador");
const Login = require("../models/logins");
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

router.post("/",avatarUploads.single('avatar'), async (req, res) => {
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
    console.log("here")
    const buffer = await sharp(req.file.buffer)
      .resize({
        width: 250,
        height: 250,
      })
      .png()
      .toBuffer();

      console.log(req.body)
      console.log(buffer)

    const utilizador = await Utilizador.create({
      nome: req.body.nome,
      email: req.body.email,
      telefone: req.body.telefone,
      avatar: buffer,
      password: req.body.password,
      tipoDePerfil: req.body.tipoDeConta,
      linkLinkedin: req.body.linkedinLink,
    });

    res.send({ utilizador });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/login", passport.authenticate("local"), async (req, res) => {
  await Login.create({
    UtilizadorId: req.user.id,
  });

  let utilizadorInfo = {
    email: req.user.email,
    nome: req.user.nome,
  };
  res.send(utilizadorInfo);
});

router.get("/me", auth, async (req, res) => {
    res.send(req.user);
})

router.get("/me/avatar",auth, async(req,res) =>{

     res.set("Content-Type", "image/png");
     res.send(req.user.avatar);
 
})

router.post("/logout", auth, (req, res) => {
  req.logout(req.user, (err) => {
    if (err) {
      return next(err);
    }
    console.log(req.user)
    res.send({ message: "Sessão encerrada" });
  });
});

module.exports = router;
