const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const people = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  document: {
    type: Number,
    required: true,
  },
  cell_phone: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("people", people);