const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const message = new Schema({
  message: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref:"users",
    required: true,
  },
  chat: {
    type: Schema.Types.ObjectId,
    ref:"chats",
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

module.exports = mongoose.model("message", message);
