// Client que utilizara a porta 888 e ira configurar a maquina

const net = require('net');

const client1 = new net.Socket();

client1.connect(888, '192.164.4.1', () => {
  console.log('Client 1: connection established with server');
  client1.write('Connected');
});

client1.setEncoding('utf-8');

client1.on('data', (data) => {
  console.log(`Data from server: ${data}`);
});

client1.on('close', () => {
  console.log('Connection closed');
});

module.exports = client1;
