const store = require('./store')

const register = async (data) => {
  if (!data) {
    return false
  }

  let exite = await store.exist(data).catch((e) => false)
  if (exite.length) {
    return true
  }

  return await store
    .add(data)
    .then((result) => result)
    .catch((e) => false)
}

const search = async (filter) => {
  return await store.get(filter).catch((e) => false)
}

const remove = async (report_id) => {
  return await store.del(report_id).catch((e) => false)
}

module.exports = {
  register,
  search,
  remove,
}
