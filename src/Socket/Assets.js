const io = require('socket.io')(9000, {
  cors: {
    origin: '*',
  },
});

const socket = { connection: null };
const socketListener = () => socket.connection;

io.on('connection', (socket_) => { console.log('Socket on'); socket.connection = socket_; });

module.exports = { io, socketListener };
