// Client que utilizara a porta 555 e recebera os parametros da maquina
const net = require('net');

const client2 = new net.Socket();

client2.connect(555, '192.164.4.1', () => {
  console.log('Client 2: connection established with server');
  client2.write('Connected');
});

client2.setEncoding('utf-8');

client2.on('data', (data) => {
  console.log(`Data from server: ${data}`);
});

client2.on('close', () => {
  console.log('Connection closed');
});

module.exports = client2;
