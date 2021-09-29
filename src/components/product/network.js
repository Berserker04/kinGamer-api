const express = require("express");
const response = require("../../network/response");
const controller = require("./controller");

const route = express();

route.post("/", (req, res) => {
  controller
    .register(req.body)
    .then((result) => {
      if (!result) return response.error(req, res, 200, "Revisa los datos");
      response.success(req, res, 201, "¡Producto registrado con exito!", result);
    })
    .catch((error) => {
      console.log(error);
      response.error(req, res, 500, "Error server intenta más tarde.");
    });
});

route.get("/", (req, res) => {});

module.exports = route;
