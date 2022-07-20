const auth = async (req, res, next) => {
  if (!req.user) {
    res.clearCookie("sessionCookie");
    return res.status(401).send({ error: "Não tem sessão iniciada" });
  }

  if(req.user.tipoDePerfil !== "externo"){
    return res.status(401).send({ error: "Não tem permissão para aceder a este recurso" });
  }
  
  next();
};
module.exports = auth;
