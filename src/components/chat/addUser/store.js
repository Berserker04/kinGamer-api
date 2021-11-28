const Model = require('./model')

const add = async (data) => {
  let newRegister = new Model(data)
  return await newRegister.save({ new: true })
}

const get = async (filter = {}) => {
  return await Model.find(filter)
    .populate({
      path: 'user1',
      model: 'users',
      populate: {
        path: 'person_id',
        model: 'people',
      },
    })
    .sort({ _id: -1 })
}

const exist = async (filter = {}) => {
  console.log(filter)
  return await Model.find({
    $and: [{ user1: filter.user1 }, { user2: filter.user2 }]
  })
}

const edit = async (_id, data = {}) => {
  return await Model.updateOne({ _id }, data)
}

const del = async (_id) => {
  return await Model.deleteOne({ _id })
}

module.exports = {
  add,
  get,
  edit,
  del,
  exist,
}
