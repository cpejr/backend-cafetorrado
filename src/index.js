const content = require('fs').readFileSync(`${__dirname}/index.html`, 'utf8');

const httpServer = require('http').createServer((req, res) => {
  // serve the index.html file
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', Buffer.byteLength(content));
  res.end(content);
});

// const buffer = new ArrayBuffer(16);
// const int32View = new Int32Array(buffer);

const io = require('socket.io')(httpServer);

io.on('connection', (socket) => {
  console.log('connect');
  socket.on('hey', (data) => {
    console.log('hey', data);
  });
  let counter = 1;
  setInterval(() => {
    // if (counter <= int32View.Length) { counter = 0; }
    // int32View[counter] = counter;
    // console.log(int32View);
    socket.emit('hello', ++counter);
  }, 200);
});
httpServer.listen(3000, () => {
  console.log('go to http://localhost:3000');
});
