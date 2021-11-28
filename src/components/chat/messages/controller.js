const store = require('./store')
const storeChat = require('../chats/store')
const saveImage = require('../../files/saveImage')

const register = async (data) => {
  if (!data) {
    return false
  }

  let public = await storeChat.get({ _id: data.chat })
  console.log(public)
  if (!public.length) {
    let exist = await storeChat.getChatPrivate({
      users: [data?.user2?._id, data?.user?._id],
    })

    if (!exist.length) {
      let newChat = await storeChat.add({
        users: [data?.user2?._id, data?.user?._id],
        type: 'privado',
      })
      data.chat = newChat._id
    } else data.chat = exist[0]._id
  }

  return await store
    .add(data)
    .then((result) => result)
    .catch((e) => false)
}

const search = async (filter) => {
  return await store.get(filter).catch((e) => false)
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
}
