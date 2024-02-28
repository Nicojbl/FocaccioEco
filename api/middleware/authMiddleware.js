const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ error: "No se proporcionó un token de autorización" });
  }
  try {
    const isAdmin = jwt.verify(token, process.env.JWT_SECRET);
    req.user = isAdmin;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Acceso denegado" });
  }
};

module.exports = verifyToken;
