const express = require("express");
const auth = require("../middleware/auth");
const multer = require("multer");
const sharp = require("sharp");
const Utilizador = require("../models/utilizador");
const Login = require("../models/logins");
const Entidade = require("../models/entidade");
const Contacto = require("../models/contacto");
const Oportunidade = require("../models/oportunidade");
const Area_Entidade = require("../models/area_entidade");
const passport = require("../passport/passport");
const Sequelize = require("sequelize");

const router = new express.Router();

const avatarUploads = multer({
  limits: {
    fileSize: 1000000, // unite: bytes --> 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Por favor  insira um ficheiro de imagem"));
    }
    cb(undefined, true);
  },
});

router.post(
  "/utilizador",
  avatarUploads.fields([
    { name: "avatar", maxCount: 1 },
    { name: "fotoEntidade", maxCount: 1 },
  ]),
  async (req, res) => {
    if (
      req.body.tipoDeConta === "Aluno" ||
      req.body.tipoDeConta === "Professor"
    ) {
      //works
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
        const buffer = await sharp(req.files["avatar"][0].buffer)
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
      //works
      // se for externo e não escolher entidade/criar nova entidade

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

        const bufferFoto = await sharp(req.files["fotoEntidade"][0].buffer)
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
        });

        const contacto = await Contacto.create({
          nome: req.body.nome,
          email: req.body.email,
          telefone: req.body.telefone,
          cargo_principal: req.body.cargoPrincipal,
          EntidadeId: entidade.id,
          UtilizadorId: utilizador.id,
        });

        let arrayOfAreas = req.body.areas.split(",").map((area) => area.trim());
        arrayOfAreas.forEach(async (area) => {
          console.log("here");
          await Area_Entidade.create({
            area: area,
            EntidadeId: entidade.id,
          });
        });
        res.send({ utilizador, entidade, contacto });
      } catch (e) {
        res.status(400).send(e);
      }
    }

    if (req.body.tipoDeConta === "Externo" && req.body.entidade) {
      // se for externo e escolher entidade já existente
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
        const buffer = await sharp(req.files["avatar"][0].buffer)
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
          avatar: buffer,
          password: req.body.password,
          tipoDePerfil: req.body.tipoDeConta,
          linkLinkedin:
            req.body.linkedinLink.length === 0 ? null : req.body.linkedinLink,
        });

        console.log("here");
        const contacto = await Contacto.create({
          nome: req.body.nome,
          email: req.body.email,
          telefone: req.body.telefone,
          cargo_principal: req.body.cargoPrincipal,
          EntidadeId: req.body.entidade,
          UtilizadorId: utilizador.id,
        });

        res.send({ utilizador, contacto });
      } catch (e) {
        res.status(400).send(e);
      }
    }
  }
);

router.post(
  "/utilizador/login",
  passport.authenticate("local"),
  async (req, res) => {
    await Login.create({
      UtilizadorId: req.user.id,
    });

    let utilizadorInfo = {
      email: req.user.email,
      nome: req.user.nome,
    };
    res.send(utilizadorInfo);
  }
);

router.get("/utilizador/me", auth, async (req, res) => {
  res.send(req.user);
});

router.get("/utilizador/me/avatar", auth, async (req, res) => {
  res.set("Content-Type", "image/png");
  res.send(req.user.avatar);
});

router.delete("/utilizador/me", auth, async (req, res) => {
  try {
    if (req.user.tipoDePerfil === "Externo") {
      const contacto = await Contacto.findOne({
        where: { UtilizadorId: req.user.id },
      });
      const oportunidades = await Oportunidade.update(
        {
          deleted: true,
        },
        {
          where: { ContactoId: contacto.id },
        }
      );

      contacto.deleted = true;
      await contacto.save();
    }

    req.user.deleted = true;
    await req.user.save();
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie("sessionCookie");
      res.send({ message: "Conta apagada" });
    });
  } catch (error) {
    res.status(500).send({ error });
  }
});

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
      res.send({ message: "Sessão encerrada" });
    });
  });
});

router.get("/entidades", async (req, res) => {
  try {
    const entidades = await Entidade.findAll({
      where: {
        deleted: false,
      },
    });

    res.send(entidades);
  } catch (error) {
    res.status(500).send({ error });
  }
});

//oportunidades
router.post("/oportunidade", auth, async (req, res) => {
  if (req.user.tipoDePerfil === "Externo") {
    const contacto = await Contacto.findOne({
      where: { UtilizadorId: req.user.id },
    });

    const oportunidade = await Oportunidade.create({
      titulo: req.body.titulo,
      descricao: req.body.descricao,
      tipo_de_oportunidade: req.body.tipoDeOportunidade,
      data_de_inicio: req.body.dataDeInicio,
      data_de_fim: req.body.dataDeFim,
      ContactoId: contacto.id,
    });

    res.send(oportunidade);
  } else {
    res
      .status(400)
      .send({ message: "Apenas externos podem criar oportunidades" });
  }
});

router.get("/oportunidades/estagios", async (req, res) => {
  try {
    const estagios = await Oportunidade.findAll({
      where: {
        deleted: false,
        tipo_de_oportunidade: "Estágio",
      },
    });

    for (const estagio of estagios) {
      const contacto = await Contacto.findOne({
        where: { id: estagio.ContactoId },
      });
      const entidade = await Entidade.findOne({
        where: { id: contacto.EntidadeId },
      });
      estagio.setDataValue("Contacto", contacto);
      estagio.setDataValue("Entidade", entidade);
    }

    res.send(estagios);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.get("/oportunidades/workshops", async (req, res) => {
  try {
    const workshops = await Oportunidade.findAll({
      where: {
        deleted: false,
        tipo_de_oportunidade: "Workshop",
      },
    });

    for (const workshop of workshops) {
      const contacto = await Contacto.findOne({
        where: { id: workshop.ContactoId },
      });
      const entidade = await Entidade.findOne({
        where: { id: contacto.EntidadeId },
      });

      workshop.setDataValue("Contacto", contacto);
      workshop.setDataValue("Entidade", entidade);
    }

    res.send(workshops);
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.get("/oportunidades/trabalhos", async (req, res) => {
  try {
    const trabalhos = await Oportunidade.findAll({
      where: {
        deleted: false,
        tipo_de_oportunidade: "Trabalho",
      },
    });

    for (const trabalho of trabalhos) {
      const contacto = await Contacto.findOne({
        where: { id: trabalho.ContactoId },
      });

      const entidade = await Entidade.findOne({
        where: { id: contacto.EntidadeId },
      });

      trabalho.setDataValue("Contacto", contacto);
      trabalho.setDataValue("Entidade", entidade);

    }

    res.send(trabalhos);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.get("/contacto/oportunidades", auth, async (req, res) => {
  if (req.user.tipoDePerfil === "Externo") {
    try {
      const contacto = await Contacto.findOne({
        where: { UtilizadorId: req.user.id },
      });
      const oportunidades = await Oportunidade.findAll({
        where: {
          deleted: false,
          ContactoId: contacto.id,
        },
      });

      res.send(oportunidades);
    } catch (error) {
      res.status(400).send({ error });
    }
  }
});

router.get('/entidade/avatar/:id',async (req,res)=>{
  try {
    const entidade = await Entidade.findOne({
      where:{
        id:req.params.id
      }
    })
    res.set("Content-Type", "image/png");
    res.send(entidade.foto)
  } catch (error) {
    res.status(500).send({ error });
  }
})

router.delete("/contacto/oportunidade/:id", auth, async (req, res) => {
  if (req.user.tipoDePerfil === "Externo") {
    try {
      const oportunidade = await Oportunidade.findOne({
        where: { id: req.params.id },
      });

      oportunidade.deleted = true;
      await oportunidade.save();
      res.send(oportunidade);
    } catch (error) {
      res.status(400).send({ error });
    }
  }
});

module.exports = router;
