const store = require('./store')
const saveImage = require('../files/saveImage')
const slug = require('slug')

const register = async (data) => {
  if (!data) {
    return false
  }

  const { image, name } = data
  if (image) data.image = saveImage(image, name)

  data.slug = slug(data.name)

  return await store
    .add(data)
    .then((result) => result)
    .catch((e) => false)
}

const search = async (filter) => {
  if (filter.limit) filter.limit = parseInt(filter?.limit)
  return await store.get(filter).catch((e) => false)
}

const update = async (product_id, data) => {
  if (!data) {
    return false
  }

  if (data.image) {
    const { image, name } = data
    if (image) data.image = saveImage(image, name)
  }

  data.slug = slug(data.name)

  return await store
    .edit(product_id, data)
    .then((result) => result)
    .catch((e) => false)
}

const remove = async (product_id) => {
  return await store.del(product_id).catch((e) => false)
}

module.exports = {
  register,
  search,
  update,
  remove,
}
