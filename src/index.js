const express = require('express');
const cors = require('cors');
const os = require('os');
const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');

const port = process.env.PORT || 3333;
const app = express();
const server = require('http').createServer(app);

const emitter = new EventEmitter();
emitter.setMaxListeners(1);

let io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});
const routes = require('./routes');

app.use(cors());
app.use(express.json());
app.use(routes);
app.listen(port, () => {
  console.log(`Is listening on ${port}`);
});

// eslint-disable-next-line
var bufferData = {
  waterTemp: 0,
  fireTemp: 0,
  ROR: 0,
  pressure: 0,
  speed: 0,
  grainyness: 0,
  time: 0,
};

let x = 2;
function addData(buffer) {
  buffer.waterTemp = Math.cos(x);
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
  loopData = setInterval(() => {
    io.to(socket.id).emit('newData', bufferData);
    addData(bufferData);
  }, 200);

  socket.on('cleanList', () => {
    socket.off('newData', () => {});
  });

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
    console.log(data);
  });

  socket.on('dataFromButton', (data) => {
    bufferData.ROR = data;
    console.log(data);
    fs.appendFile((path.join(__dirname), 'buttonData.txt'), `${data} \n`, (err) => {
      if (err) throw err;
    });
  });

  socket.on('disconnect', () => {
    console.log(`cleaning ${socket.id}`);
    clearInterval(loopData);
  });
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
  console.log('/********Real-time usage of PC RAM*********/');
  console.table(pcStats);
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
}, 1000);
io = io.listen(server);
server.listen(8888);
