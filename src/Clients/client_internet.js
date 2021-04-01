const net = require('net');
const fs = require('fs');
const os = require('os');
const path = require('path');
const performance = require('perf_hooks');
const { formatServerData } = require('../Structs/DataStruct');
const { io } = require('../Socket');

const client1 = new net.Socket();

// const { Socket } = require('dgram');
// const { dirname } = require('path');
// const { Z_ASCII } = require('zlib');
// const { formatWifiData } = require('../Structs/WifiStruct');
// const { connectData } = require('./client_data');
// const { client } = require('../database/connection');

const { processLineByLine } = require('../ReadStruct/ReadStruct');

function connectWifi() {
  client1.connect(555, '192.168.5.1', () => {
    console.log('Client 1: connection established with server');
    client1.write('Connected');
    client1.destroy();
    client1.connect(888, '192.168.5.1', () => {
      client1.write('Connected');
    });
  });
}
connectWifi();
const t0 = performance.performance.now();
io.on('connection', (socket) => {
  console.log(socket.id);
  client1.on('data', (data) => {
    const formattedData = formatServerData(data);
    if (formattedData.get('BlkBegDaq').toString(16) !== 'cccccccc'
  || formattedData.get('BlkEndDaq').toString(16) !== 'dddddddd') return;
    // console.log('BlkBegDaq', formattedData.get('BlkBegDaq').toString(16));
    // console.log('MdlRunCnt', formattedData.get('MdlRunCnt'));
    // console.log('MdlAirScl', formattedData.get('MdlAirScl'));
    // console.log('MdlGraScl', formattedData.get('MdlGraScl'));
    // console.log('MdlDisErr', formattedData.get('MdlDisErr'));
    // console.log('MdlInjOut', formattedData.get('MdlInjOut'));
    // console.log('MdlDruOut', formattedData.get('MdlDruOut'));
    // console.log('MdlAirOut', formattedData.get('MdlAirOut'));
    // console.log('BlkEndDaq', formattedData.get('BlkEndDaq').toString(16));
    // if (!did) {
    // writer.write(data);
    fs.appendFile(path.join('src/RoastArchive/TorraLive'), data, 'binary', () => {});
    io.to(socket.id).emit('realData', formattedData);
  //   did = true;
  // }
  });
});
const t1 = performance.performance.now();
// processLineByLine();
// setTimeout(() => {
//   fs.appendFile(path.join('src/RoastArchive/', 'LiveData'), `${buffer}`, (err) => {
//     if (err) throw err;
//   });
// }, 10000);
// client1.on('close', () => {
//   console.log('Connection closed');
// });

// async function destroyConnection() {
//   return client1.destroy();
// }
// async function writeNewWifi(req, resp) {
//   try {
//     const { newName } = req.body;

//     console.log(newName);

//     const wifi = new Struct()
//       .word32Ule('Beg')
//       .charsnt('Sid', 31)
//       .charsnt('Pas', 31)
//       .word8('Chn')
//       .word8('Hid')
//       .word32Ule('End');
//     // eslint-disable-next-line

//     console.log(parseInt('0x44444444'));

//     wifi.allocate();
//     const buf = wifi.buffer();

//     for (let i = 0; i < buf.length; i++) {
//       buf[i] = 0;
//     }
//     console.log(buf);

//     const proxy = wifi.fields;

//     proxy.Beg = parseInt('0x44444444');
//     proxy.Sid = newName;
//     proxy.Pas = '000001_ROASTER';
//     proxy.Chn = 13;
//     proxy.Hid = 0;
//     proxy.End = parseInt('0x55555555');
//     console.log(buf);

//     // wifi.set('Beg', parseInt('0x44444444'));
//     // wifi.set('Sid', newName);
//     // wifi.set('Pas', '000001_ROASTER');
//     // wifi.set('Chn', 13);
//     // wifi.set('Hid');
//     // wifi.set('End', parseInt('0x55555555'));

//     client1.write(buf);

//     return resp.status(200).json({ Message: `Nome da rede mudado para ${newName}` });
//   } catch (error) {
//     console.log(error);
//     return resp.status(500).json({ Message: 'Erro ao mudr o nome da rede' });
//   }
// }
setInterval(() => {
  const { freemem, totalmem } = os;
  const total = parseInt(totalmem() / 1024 / 1024);
  const mem = parseInt(freemem() / 1024 / 1024);
  const percents = parseInt((mem / total) * 100);
  const writeFile = t1 - t0;
  const pcStats = {
    free: `${mem} MB`,
    total: `${total} MB`,
    usage: `${percents}%`,
    timeWriting: `${writeFile} ms`,
  };
  console.clear();
  console.log('/********Real-time usage of Tablet RAM*********/');
  console.table(pcStats);
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
}, 1000);

module.exports = client1;
