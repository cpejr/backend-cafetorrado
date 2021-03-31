const http = require('http');
const app = require('./app');

const wifiClient = require('./Clients/client_internet').client1;
const dataServer = require('./Clients/client_data').client2;

const server = http.createServer(app);
server.listen(8080);
