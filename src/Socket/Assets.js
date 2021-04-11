const io = require('socket.io')(9000, {
  cors: {
    origin: '*',
  },
});

module.exports = { io };
