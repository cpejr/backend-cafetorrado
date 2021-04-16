const fs = require('fs');
const path = require('path');
const net = require('net');
const { formatServerData } = require('../Structs/toStruct_Data');
const { io } = require('../Socket/Assets')
const { CommandData } = require('../Structs/toStruct_cmdData')
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
  
      client.on('data', (data) => {
        //console.log(CommandData())
        //client.write(CommandData());
        const formattedData = formatServerData(data);
        const validatorBegin = formattedData.get('BlkBegDaq').toString(16);
        const validatorEnd = formattedData.get('BlkEndDaq').toString(16);
        console.log(formattedData.fields.MdlInjOut, ' inj');
        console.log(formattedData.fields.MdlDruOut, 'dru');
        console.log(formattedData.fields.MdlAirOut, 'air');
        if (validatorBegin === 'cccccccc' && validatorEnd === 'dddddddd' && validatorBegin !== 0 && validatorEnd !== 0) {
          io.emit('realData', formattedData);
          fs.appendFile(path.join('src/RoastArchive/TEMPORARY', 'DataStructs'), data, (err) => { if(err) throw err; })
          fs.appendFile(path.join('src/RoastArchive/TEMPORARY', 'ParsedData.json'), separator + JSON.stringify(formattedData.fields), 'utf-8', (err) => { if(err) throw err; })  
          if(!separator) separator = ',\n';
        }
      });
    });
  }catch(err) {
    console.error(err)
  }
  return client;
}

module.exports = { connectData };
