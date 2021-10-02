const jwt = require("jsonwebtoken");
const response = require("../../../network/response");

const validateToken = async (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) return response.error(req, res, 401, "No autorizado");

  let user = null;
  token = token.split(" ")[1];

  jwt.verify(token, process.env.SEED, (err, decoded) => {
    if (!err) user = decoded;
  });

  if (!user) return response.error(req, res, 401, "No autorizado");

  let Today = Math.round(new Date().getTime() / 1000);

  const { exp } = user;

  if (Today < exp) return next();

  return response.error(req, res, 401, "No autorizado");
};

module.exports = validateToken;
