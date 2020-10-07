const PORT = process.env.PORT || 8080

const io = require('socket.io')
const express = require('express')
const { createServer } = require('http')

const app = express()
const srv = createServer(app)
const socketIo = io(srv)
const { aheui } = require('actac')

app.use(express.static('./page'))
socketIo.on('connection', (socket) => {
  socket.on('msg', (msg) => {
    const test = msg.split('').find((char) => !/^[\x00-\x7F]*$/.test(char))
    if (test) return
    socketIo.emit('msg', socket.handshake.address + ': ' + aheui(msg))
  })
})

srv.listen(PORT, () => console.log('Server is now on http://localhost:' + PORT))
