const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const products = new Schema({
  name: {
    type: "String",
    required: true,
  },
  description: {
    type: "String",
    required: true,
  },
  urlProduct: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  state: {
    type: Boolean,
    required: true,
    default: true,
  },
  createAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("products", products);
