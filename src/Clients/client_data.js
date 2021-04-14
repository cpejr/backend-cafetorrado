const fs = require('fs');
const path = require('path');
const net = require('net');
const { formatServerData } = require('../Structs/toStruct_Data');
const { performance } = require('perf_hooks')
const { io } = require('../Socket/Assets')

async function connectData() {
  fs.mkdir(path.join('src/RoastArchive', 'TEMPORARY'), 0777, (err) => { 
    if(err) {
      fs.truncateSync(path.join('src/RoastArchive/TEMPORARY/DataStructs'), 0)
      fs.truncateSync(path.join('src/RoastArchive/TEMPORARY/ParsedData.json'), 0)
    }
    fs.appendFile(path.join('src/RoastArchive/TEMPORARY', 'DataStructs'), '', (err) => { if(err) throw err; })
    fs.appendFile(path.join('src/RoastArchive/TEMPORARY','ParsedData.json'), '', (err) => { if(err) throw err; })
  })

  const client = new net.Socket();
  try{
    client.connect(888, '192.168.5.1', () => {
      console.log('Client 1: Data connection established with server');
      client.write('Connected');
  
      client.on('close', () => {
        console.log('this')
        client.destroy();
        console.log('Data connection closed');
      });
  
      client.on('data', (data) => {
        const formattedData = formatServerData(data);
        const validatorBegin = formattedData.get('BlkBegDaq').toString(16);
        const validatorEnd = formattedData.get('BlkEndDaq').toString(16);
        if (validatorBegin === 'cccccccc' && validatorEnd === 'dddddddd' && validatorBegin !== 0 && validatorEnd !== 0) {
          io.emit('realData', formattedData);
          fs.appendFile(path.join('src/RoastArchive/TEMPORARY', 'DataStructs'), data, (err) => { if(err) throw err; })
          fs.appendFile(path.join('src/RoastArchive/TEMPORARY', 'ParsedData.json'), `${JSON.stringify(formattedData.fields)},`, 'utf-8', (err) => { if(err) throw err; })  
        }
      });
    });
  }catch(err) {
    console.error(err)
  }
  return client;
}

module.exports = { connectData };
