const express = require('express')

const response = require('../../../network/response')
const controller = require('./controller')
const { socket } = require('../../../socket')
const route = express()

route.post('/', (req, res) => {
  controller
    .register(req.body)
    .then((result) => {
      if (!result) return response.error(req, res, 200, 'Revisa los datos.')
      socket.io.emit(req.body?.users[0], result)
      socket.io.emit(req.body?.users[1], result)
      response.success(req, res, 201, 'Registro exíto.', result)
    })
    .catch((error) => {
      console.error(error)
      response.error(req, res, 500, 'Error al registrar intenda más tarde.')
    })
})

route.get('/', (req, res) => {
  let filter = {
    ...req.query,
  }
  controller
    .search(filter)
    .then((result) => {
      if (!result)
        return response.success(req, res, 200, 'Chats no encontrodos.')
      response.success(req, res, 200, 'Chats', result)
    })
    .catch((error) => {
      console.error(error)
      response.error(req, res, 500, 'Error al registrar intenda más tarde.')
    })
})

route.get('/private', (req, res) => {
  let filter = {
    ...req.query,
  }
  controller
    .getChatPrivate(filter)
    .then((result) => {
      if (!result)
        return response.success(req, res, 200, 'Chats no encontrodos.')
      response.success(req, res, 200, 'Chats', result)
    })
    .catch((error) => {
      console.error(error)
      response.error(req, res, 500, 'Error al registrar intenda más tarde.')
    })
})

route.put('/:_id', (req, res) => {
  controller
    .update(req.params._id, req.body)
    .then((result) => {
      if (!result) return response.error(req, res, 200, 'Revisa los datos.')
      response.success(req, res, 200, 'Modificación exítosa.')
    })
    .catch((error) => {
      console.error(error)
      response.error(req, res, 500, 'Error al modificar intenda más tarde.')
    })
})

route.delete('/:_id', (req, res) => {
  controller
    .remove(req.params._id)
    .then((result) => {
      if (!result) return response.error(req, res, 200, 'Revisa los datos.')
      response.success(req, res, 200, 'Eliminación exítosa.')
    })
    .catch((error) => {
      console.error(error)
      response.error(req, res, 500, 'Error al eliminar intenda más tarde.')
    })
})

module.exports = route
