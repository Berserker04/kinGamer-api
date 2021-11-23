const socketIO = require('socket.io')

const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage'
const socket = {}

const connect = (server) => {
  socket.io = socketIO(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  })

  socket.io.on('connection', (socket) => {
    // Join a conversation
    const { roomId } = socket.handshake.query
    socket.join(roomId)

    // Listen for new messages
    socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
      socket.io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data)
    })

    // Leave the room if the user closes the socket
    socket.on('disconnect', () => {
      socket.leave(roomId)
    })
  })
}

module.exports = {
  connect,
  socket,
}
