const express = require('express')

const response = require('../../../network/response')
const { socket } = require('../../../socket')
const controller = require('./controller')

const route = express()

const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage'

route.post('/', (req, res) => {
  controller
    .register(req.body)
    .then(async (result) => {
      if (!result) return response.error(req, res, 200, 'Revisa los datos.')
      // let data = {
      //   ...result._doc,
      //   user: req.body.user,
      // }
      result._doc.user = req.body.user
      // socket.io.emit(NEW_CHAT_MESSAGE_EVENT, result)
      socket.io.in(req.body.chat).emit(NEW_CHAT_MESSAGE_EVENT, result)
      socket.io.emit(req.body?.user?._id, result)
      socket.io.emit(req.body?.user2?._id, result)
      response.success(req, res, 201, 'Registro exíto', result)
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
      response.success(req, res, 200, 'Producto registrado', result)
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
