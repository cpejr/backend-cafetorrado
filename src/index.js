const express = require('express');
const EventEmitter = require('events');

const app = express();
const server = require('http').createServer(app);
let io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});

const emitter = new EventEmitter();
emitter.setMaxListeners(50);

/*eslint-disable */
var bufferData = {
  waterTemp: 0,
  fireTemp: 0,
  ROR: 0,
};
/* eslint-enable */

function addData(buffer) {
  console.log(buffer);
  buffer.waterTemp += 1;
  buffer.fireTemp += 1;
  buffer.ROR += 1;
}

app.get('/', (req, res) => {
  res.send('Connected');
});

io.on('connection', (socket) => {
  console.log(socket.id);
  setInterval(() => {
    socket.emit('newData', bufferData);
    addData(bufferData);
  }, 200);
});

io = io.listen(server);
server.listen(8888);
