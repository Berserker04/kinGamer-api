const Product = require("./model");

const add = async (product) => {
  const newProduct = new Product(product);
  return await newProduct.save({ new: true });
};

module.exports = {
  add,
};
