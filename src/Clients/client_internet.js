const net = require('net');
/* const fs = require('fs'); */
/* const path = require('path'); */
/* const { formatServerData } = require('../Structs/DataStruct');
*/
const { formatWifiData } = require('../Structs/WifiStruct');

function connectWifi() {
  const client = new net.Socket();
  client.connect(555, '192.168.5.1', () => {
    console.log('Client: Wifi connection established with server');
    client.write('Connected');

    client.on('close', () => {
      console.log('Wifi configuration connection closed');
    });

    client.on('data', (data) => {
      const formattedData = formatWifiData(data);
      console.log('formattedData', formattedData);
    });
  });
  return client;
}

// io.on('connection', (socket) => {
//   console.log(socket.id);
// });

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
// setInterval(() => {
//   const { freemem, totalmem } = os;
//   const total = parseInt(totalmem() / 1024 / 1024);
//   const mem = parseInt(freemem() / 1024 / 1024);
//   const percents = parseInt((mem / total) * 100);
//   const pcStats = {
//     free: `${mem} MB`,
//     total: `${total} MB`,
//     usage: `${percents}%`,
//     timeWriting: `${writeFile} ms`,
//   };
//   console.clear();
//   console.log('/********Real-time usage of Tablet RAM*********/');
//   console.table(pcStats);
//   const used = process.memoryUsage().heapUsed / 1024 / 1024;
//   console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
// }, 1000);

module.exports = { connectWifi };
