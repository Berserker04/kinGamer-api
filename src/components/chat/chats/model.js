const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chats = new Schema({
  users: [{
    type: Schema.Types.ObjectId,
    ref:"users",
    // required: true,
  }],
  type: {
    type: String, // grupo - privado - publico
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
  update_at: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("chats", chats);
