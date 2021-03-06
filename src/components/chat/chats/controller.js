const store = require('./store')
const saveImage = require('../../files/saveImage')

const register = async (data) => {
  if (!data) {
    return false
  }

  // const { users } = data;
  // if (image) data.image = saveImage(image, name);
  // console.log(data);
  return await store
    .add(data)
    .then((result) => result)
    .catch((e) => false)
}

const search = async (filter) => {
  return await store.get(filter).catch((e) => false)
}

const getChatPrivate = async (filter) => {
  return await store.getChatPrivate(filter).catch((e) => false)
}

const update = async (report_id, data) => {
  if (!data) {
    return false
  }
  const { image, name } = data
  if (image) data.image = saveImage(image, name)
  return await store
    .edit(report_id, data)
    .then((result) => result)
    .catch((e) => false)
}

const remove = async (report_id) => {
  return await store.del(report_id).catch((e) => false)
}

module.exports = {
  register,
  search,
  update,
  remove,
  getChatPrivate,
}
