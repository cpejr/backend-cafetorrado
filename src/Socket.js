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

io.on('connection', (socket) => { 
  socket.on('start',() =>{
      io.to(socket.id).emit('newData', bufferData);
  })

  socket.on('stop' , () =>{
    socket.off('newData',() => {})
  })

  // socket.on('disconnect', () => {
  //   console.log(`cleaning ${socket.id}`);
  // })
});

io = io.listen(socketServer);
socketServer.listen(8888);
module.exports  =  { io }