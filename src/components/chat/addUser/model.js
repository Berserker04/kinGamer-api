const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chat_requests = new Schema({
  user1: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  user2: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('chat_requests', chat_requests)
