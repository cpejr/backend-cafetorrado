/*eslint-disable*/
const express = require('express');
const os = require('os');
const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');

const app = express();
const socketServer = require('http').createServer(app);

const emitter = new EventEmitter();
emitter.setMaxListeners(1);

let io = require('socket.io')(socketServer, {
  cors: {
    origin: '*',
  },
});
const bufferData = {
  ROR:0,
  fireTemp:0,
}

io.on('connection', (socket) => { 
  socket.on('start',() =>{
      io.to(socket.id).emit('newData', bufferData);
    }, 200);
  }
  })

  socket.on('stop' , () =>{
    socket.off('newData',() => {})
  })

  fs.readFile((path.join(__dirname), 'buttonData.txt'), 'utf8', (err, data) => {
    if (err) {
      throw err;
      return;
    }
    setInterval(() => {
      socket.emit('txtFile', data);
    }, 1000);
  });

  socket.on('manualData', (data) => {
    fs.appendFile((path.join(__dirname), 'buttonData.txt'), `${data},`, (err) => {
      if (err) throw err;
    });
  });

  socket.on('disconnect', () => {
    console.log(`cleaning ${socket.id}`);
    socket.off('newData', () => {};
  })
});

setInterval(() => {
  const { freemem, totalmem } = os;
  const total = parseInt(totalmem() / 1024 / 1024);
  const mem = parseInt(freemem() / 1024 / 1024);
  const percents = parseInt((mem / total) * 100);
  const pcStats = {
    free: `${mem} MB`,
    total: `${total} MB`,
    usage: `${percents}%`,
  };
  console.clear();
  console.log('/********Real-time usage of Tablet RAM*********/');
  console.table(pcStats);
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
}, 1000);

io = io.listen(socketServer);
socketServer.listen(8888);
