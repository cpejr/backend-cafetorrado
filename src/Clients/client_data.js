const net = require('net');
const { formatServerData } = require('../Structs/DataStruct');

const io = require('socket.io')(9000, {
  cors: {
    origin: '*',
  },
});

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
      const validatorBegin = formattedData.get('BlkBegDaq').toString(16);
      const validatorEnd = formattedData.get('BlkEndDaq').toString(16);
      if (validatorBegin === 'cccccccc' && validatorEnd === 'dddddddd') { io.emit('realData', formattedData); }
    });
  });
  return client1;
}

module.exports = { connectData };
