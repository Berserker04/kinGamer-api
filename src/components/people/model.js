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
  image: {
    type: String,
    // required: false,
  },
});

module.exports = mongoose.model("people", people);
