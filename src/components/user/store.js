const User = require('./model')

const add = async (user) => {
  let newUser = new User(user)
  return await newUser.save({ new: true })
}

const get = async (filter) => {
  return await User.find(filter, [
    'user_name',
    'email',
    'user_id',
    'person_id',
    'state',
  ]).populate('person_id')
}

const edit = async (filter = {}, data = {}) => {
  return await User.updateOne(filter, data)
}

module.exports = {
  add,
  get,
  edit,
}
