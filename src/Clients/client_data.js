const net = require('net');

const { formatServerData } = require('../Structs/DataStruct');

function connectData() {
  const client1 = new net.Socket();
  client1.connect(888, '192.168.5.1', () => {
    console.log('Client 1: Data connection established with server');
    client1.write('Connected');

    client1.on('close', () => {
      console.log('Data connection closed');
    });

    client1.on('data', (data) => {
      const formattedData = formatServerData(data);
      console.log('formattedData', formattedData);
    });
  });
  return client1;
}

module.exports = { connectData };
