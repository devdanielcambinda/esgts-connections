const auth = async (req, res, next) => {
  if (!req.user) {
    res.clearCookie("sessionCookie");
    return res.status(401).send({ error: "Não tem sessão iniciada" });
  }
  next();
};
module.exports = auth;
