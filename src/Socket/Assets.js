const io = require('socket.io')(9000, {
  cors: {
    origin: '*',
  },
});

io.on('connection', () => { console.log('Socket connected'); });
module.exports = { io };
