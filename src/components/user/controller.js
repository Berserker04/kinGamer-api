const bcrypt = require('bcrypt')
const saveImage = require('../files/saveImage')

const storePerson = require('../people/store')
const store = require('./store')
const storeLogin = require('../auth/store')

const register = async (data) => {
  let { user } = data

  if (!user) {
    return false
  }

  // if (person.image) {
  //   person.image = saveImage(data.image, user.user_name)
  // }

  const person = await storePerson.add({}).catch((e) => false)

  user.password = bcrypt.hashSync(user.password, 10)

  user.role = 'Client'

  user = {
    ...user,
    person_id: person._id,
    state: 'active',
  }

  return await store
    .add(user)
    .then((result) => {
      user.password = undefined
      return result
    })
    .catch((e) => {
      storePerson.del(person._id)
      let message = null
      if (e.errors.user_name)
        message = 'El usuario ingresado ya se encuentra registrado.'
      if (e.errors.email)
        message = 'El correo ingresado ya se encuentra registrado.'
      return {
        isFalse: true,
        message,
      }
    })
}

const search = async (filter) => {
  return await store
    .get(filter)
    .then((result) => result[0])
    .catch((e) => false)
}

const changeState = async (filter, data) => {
  return await store.edit({ _id: filter._id }, data).catch((e) => false)
}

const update = async (user_id, data) => {
  let { user, ...person } = data

  if (!user || !person) {
    return false
  }

  if (person.image) {
    person.image = saveImage(data.image, user.user_name)
  } else {
    delete person.image
  }

  await storePerson.edit({ _id: person._id }, person).catch((e) => false)

  if (user.password) user.password = bcrypt.hashSync(user.password, 10)
  return await store
    .edit({ _id: user_id }, user)
    .then((result) => {
      result.password = ''
      return result
    })
    .catch((e) => false)
}

const updatePassword = async (user_id, data) => {
  let { password, oldPassword, user_name } = data

  let users = await storeLogin.get(user_name).catch((e) => false)

  if (users) {
    if (!(users.length > 0)) {
      return false
    }

    let user = users[0]
    if (!bcrypt.compareSync(oldPassword || '', user.password)) {
      return false
    }
    
    if (password) password = bcrypt.hashSync(password, 10)

    return await store
      .edit({ _id: user_id }, { password })
      .then((result) => {
        result.password = ''
        return result
      })
      .catch((e) => false)
  } else {
    return false
  }
}

module.exports = {
  register,
  search,
  changeState,
  update,
  updatePassword,
}
