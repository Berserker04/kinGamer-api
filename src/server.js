const express = require('express')
const colors = require('colors')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')
// const path2 = require("");

require('./config')

const app = express()
app.use(cors())
const server = require('http').Server(app)

const socket = require('./socket')
socket.connect(server)

app.use(morgan('tiny'))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, '../public')))

const route = require('./network')
route(app)

// io.on('connection', (socket) => {
//   console.log('se conecto')
// })

server.listen(process.env.PORT, () => {
  console.clear()
  console.log(`${'Server'.yellow} ${'running ... =>'.blue} ${'OK!'.red}`)
})
