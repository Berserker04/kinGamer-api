const Chat = require('./model')

const add = async (data) => {
  let newChat = new Chat(data)
  return await newChat.save({ new: true })
}

const get = async (filter = {}) => {
  return await Chat.find(filter)
    .populate({
      path: 'users',
      model: 'users',
      populate: {
        path: 'person_id',
        model: 'people',
      },
    })
    .sort({ _id: -1 })
}

const getChatPrivate = async (filter = {}) => {
  return await Chat.find({
    $or: [
      { $and: [{ users: filter.users[0] }, { users: filter.users[1] }] },
      { $and: [{ users: filter.users[1] }, { users: filter.users[0] }] },
    ],
  })
    .populate({
      path: 'users',
      model: 'users',
      populate: {
        path: 'person_id',
        model: 'people',
      },
    })
    .sort({ _id: -1 })
}

const edit = async (_id, data = {}) => {
  return await Chat.updateOne({ _id }, data)
}

const del = async (_id) => {
  return await Chat.deleteOne({ _id })
}

module.exports = {
  add,
  get,
  edit,
  del,
  getChatPrivate,
}
