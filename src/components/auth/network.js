const express = require("express");

const response = require("../../network/response");
const controller = require("./controller");

const route = express();

route.post("/", async (req, res) => {
  controller
    .login(req.body)
    .then((result) => {
      if (!result)
        return response.error(req, res, 200, "Credenciales incorrectas.");
      response.success(req, res, 200, "Logueado", result);
    })
    .catch((error) => {
      console.error(error);
      response.error(req, res, 500, "Error al ingresar   intenda más tarde.");
    });
});

route.get("/", (req, res) => {
  controller
    .validateToken(req.headers.authorization)
    .then((result) => {
      if (!result) return response.error(req, res, 200, "Token invalido");
      response.success(req, res, 200, "Token valido", result);
    })
    .catch((error) => {
      console.error(error);
      response.error(req, res, 500, "Error al validar intenda más tarde.");
    });
});

module.exports = route;
