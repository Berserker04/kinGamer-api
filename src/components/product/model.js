const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const products = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: "string",
    required: true,
  },
  urlBuy: {
    type: "string",
    required: true,
  },
  state: {
    type: Boolean,
    required: true,
    default: true,
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("products", products);
