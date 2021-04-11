const fs = require('fs');
const path = require('path');
const net = require('net');
const { formatServerData } = require('../Structs/toStruct_Data');
const { io } = require('../Socket/Assets')

async function connectData() {
  fs.mkdir(path.join('src/RoastArchive', 'TEMPORARY'), 0777, (err) => { 
    if(err) throw err;
    fs.appendFile(path.join('src/RoastArchive/TEMPORARY', 'DataStructs'), '', (err) => { if(err) throw err; })
  })

  const client = new net.Socket();
  client.connect(888, '192.168.5.1', () => {
    console.log('Client 1: Data connection established with server');
    client.write('Connected');

    client.on('close', () => {
      console.log('Data connection closed');
    });

    client.on('data', (data) => {
      const formattedData = formatServerData(data);
      const validatorBegin = formattedData.get('BlkBegDaq').toString(16);
      const validatorEnd = formattedData.get('BlkEndDaq').toString(16);
      if (validatorBegin === 'cccccccc' && validatorEnd === 'dddddddd') {
        io.emit('realData', formattedData);
        fs.appendFile(path.join('src/RoastArchive/TEMPORARY', 'DataStructs'), data, (err) => { if(err) throw err; })
      }
    });
  });
  console.log('done');
  return client;
}

module.exports = { connectData };
