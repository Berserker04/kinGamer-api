const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')

const users = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  user_name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // user_id: {
  //   type: Schema.Types.ObjectId,
  //   ref: "users",
  //   required: false,
  // },
  person_id: {
    type: Schema.Types.ObjectId,
    ref: 'people',
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: 'Client',
  },
  state: {
    type: String,
    required: true,
  },
})

users.plugin(uniqueValidator, { message: 'El campo {PATH} debe ser único.' })

module.exports = mongoose.model('users', users)
