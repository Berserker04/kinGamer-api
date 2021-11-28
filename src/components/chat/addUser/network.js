const express = require('express')

const response = require('../../../network/response')
const controller = require('./controller')

const route = express()

route.post('/', (req, res) => {
  controller
    .register(req.body)
    .then((result) => {
      if (!result) return response.error(req, res, 200, 'Revisa los datos.')
      response.success(req, res, 201, 'Solicitud enviada', result)
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

route.delete('/:_id', (req, res) => {
  controller
    .remove(req.params._id)
    .then((result) => {
      if (!result) return response.error(req, res, 200, 'Revisa los datos.')
      response.success(req, res, 200, 'Solicitud rechazada')
    })
    .catch((error) => {
      console.error(error)
      response.error(req, res, 500, 'Error al eliminar intenda más tarde.')
    })
})

module.exports = route
