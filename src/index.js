const webSocketServer = require('websocket').server;
const http = require('http');

const webSocketServerPort = 9000;

const server = http.createServer();
server.listen(webSocketServerPort);
console.log('listening on port 9000');

const getUniqueID = () => 1;
// const s4 = () => Math.floor((1 + Math.random()).toString(16).substring(1));
const wsServer = new webSocketServer({
  httpServer: server,
});

const clients = {};

wsServer.on('request', (request) => {
  const userID = getUniqueID();
  console.log(`${new Date()} Received new connection from origin ${request.origin} . `);

  const connection = request.accept(null, request.origin);
  clients[userID] = connection;
  console.log(`connected: ${userID}in${Object.getOwnPropertyNames(clients)}`);

  connection.on('message', (message) => {
    console.log(message);
    if (message.type === 'utf8') {
      console.log('Received Message: ', message.utf8Data);
      for (const key in clients) {
        clients[key].sendUTF(message.utf8Data);
        console.log('send message to: ', clients[key]);
      }
    }
  });
});
