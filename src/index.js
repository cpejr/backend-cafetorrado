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
  waterTemp:0,
  fireTemp: 0,
  ROR: 0,
  pressure: 0,
  speed: 0,
  grainyness: 0,
  time: 0,

};
let x = 2

function addData(buffer) {
  buffer.waterTemp = Math.cos(x);
 // buffer.ROR = 0;
 
  buffer.fireTemp = -Math.sin(x);
  buffer.pressure = -Math.cos(x);
  buffer.grainyness = Math.random();
  buffer.speed = -Math.random();
  buffer.time += 1;
  x += 0.1;
}


app.get('/', (req, res) => {
  res.send('Connected'); 
});



io.on('connection', (socket) => { 
  let loopData; 
  socket.on('start',() =>{
    if(!loopData){
    loopData = setInterval(() => {
      io.to(socket.id).emit('newData', bufferData);
      addData(bufferData);
    }, 200);
  }
  })

  socket.on('stop' , () =>{
    if(loopData)clearInterval(loopData);
    bufferData.time = 0;
  })

  socket.on('manualData', (data) => {
    console.log(data);
  })

  socket.on('dataFromButton', (data) => {
    bufferData.ROR = data;
    console.log(data)  
  })

  socket.on('disconnect', () => {
    console.log('cleaning ' + socket.id);
    clearInterval(loopData);
    bufferData.time = 0;
  })




});




io = io.listen(server);
server.listen(8888);
