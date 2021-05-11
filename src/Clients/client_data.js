const fs = require('fs');
const path = require('path');
const net = require('net');
const { formatServerData } = require('../Structs/daq_t');
const { io } = require('../Socket/Assets')
const { performance } = require('perf_hooks')
const { updateStructCommands, sendData } = require('../Structs/set_cmd');
const { parseHex } = require('../Structs/parseHex');
const hexToBinary = require('hex-to-binary')
let separator = '';

async function connectData() {
  fs.mkdir(path.join('src/RoastArchive', 'TEMPORARY'), 0777, (err) => { 
    if(err) {
      fs.truncateSync(path.join('src/RoastArchive/TEMPORARY/DataStructs'), 0)
      fs.truncateSync(path.join('src/RoastArchive/TEMPORARY/ParsedData.json'), 0)
    }
    fs.appendFile(path.join('src/RoastArchive/TEMPORARY', 'DataStructs'), '', (err) => { if(err) throw err; })
    fs.appendFile(path.join('src/RoastArchive/TEMPORARY','ParsedData.json'), '[\n', (err) => { if(err) throw err; })
  })

  const client = new net.Socket();
  try{
    client.connect(888, '192.168.5.1', () => {

      console.log('Client 1: Data connection established with server');
      client.write('Connected');
  
      client.on('close', () => {
        console.log('this')
        fs.appendFile(path.join('src/RoastArchive/TEMPORARY','ParsedData.json'), '\n]', (err) => { if(err) throw err; })
        separator = '';
        client.destroy();
        console.log('Data connection closed');
      });
      // cccccccc8417010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010100002f43000011430000a04001010101010101010101010101010101000016430101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101dddddddd
      // cccccccc8117010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010100002f43000011430000a04001010101010101010101010101010101000016430101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101dddddddd
      client.on('data', (data) => {
        const unpacked = formatServerData(data);
        const validatorBegin = unpacked.get('BlkBegDaq').toString(16);
        const validatorEnd = unpacked.get('BlkEndDaq').toString(16);
        if (validatorBegin === 'cccccccc' && validatorEnd === 'dddddddd' && validatorBegin !== 0 && validatorEnd !== 0) {
          io.emit('realData', unpacked);
          fs.appendFile(path.join('src/RoastArchive/TEMPORARY', 'DataStructs'), data, (err) => { if(err) throw err; })
          fs.appendFile(path.join('src/RoastArchive/TEMPORARY', 'ParsedData.json'), separator + JSON.stringify(unpacked.fields), 'utf-8', (err) => { if(err) throw err; })  
          if(!separator) separator = ',\n';
          console.log(unpacked.fields.MdlInjOut)
          client.write(sendData())
          //updateStructCommands(unpacked.fields);
          const t1 = performance.now();
        }
        
      });
    });
  }catch(err) {
    console.error(err)
  }
  return client;
}

module.exports = { connectData };
