const product = require("../components/product/network");

const route = (app) => {
  app.use("/product", product);
};

module.exports = route;
