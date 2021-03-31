const net = require('net');

const client1 = new net.Socket();
const { Struct } = require('struct');

const _ = require('c-struct');
const { Socket } = require('dgram');
const { connectData } = require('./client_data');
const { client } = require('../database/connection');

function catchWifiInformations(buffer) {
  const wifi = new Struct()
    .word32Ule('Beg')
    .charsnt('Sid', 31)
    .charsnt('Pas', 31)
    .word8('Chn')
    .word8('Hid')
    .word32Ule('End');
  // eslint-disable-next-line
  wifi._setBuff(buffer);

  const {
    Beg, Sid, Pas, Chn, Hid, End,
  } = wifi.fields;

  const obj = {
    Beg: Beg.toString(16), Sid, Pas, Chn, Hid, End: End.toString(16),
  };

  return obj;

  // console.log(obj);

  // console.log(wifi.fields);

  // const formattedWifi = {
  //   Beg: Number(wifi.get('Beg')).toString(16),
  //   Sid: wifi.get('Sid'),
  //   Pas: wifi.get('Pas'),
  //   Chn: wifi.get('Chn'),
  //   Hid: wifi.get('Hid'),
  //   End: Number(wifi.get('End')).toString(16),
  // }

  // return formattedWifi;
}

function catchData(buffer) {
  const serverData = new Struct()
    .word32Ule('BlkBegDaq')
    // .floatle('MdlAirScl') // Temperatura do Ar Scaled = 175
    // .floatbe('MdlGraScl') // Temperatura do Grao Scaled = 145
    // .floatle('MdlDisErr') // Erro do Modelo = 5
    // .floatle('MdlInjOut') // Percentual de chama = 25
    // .floatle('MdlDruOut') // Percentual de tambor = 65
    // .floatbe('MdlAirOut') // Percentual de ar = 75
    .word32Ule('BlkEndDaq');
    // eslint-disable-next-line
   serverData._setBuff(buffer);
  return serverData;
}
function connectWifi() {
  client1.connect(555, '192.168.5.1', () => {
    console.log('Client 1: connection established with server');
    client1.write('Connected');
    // client1.destroy();
    // client1.connect(888, '192.168.5.1', () => {});
  });
}
connectWifi();
// setTimeout(() => {
//   destroyConnection();
// }, 1000);
setTimeout(() => {
  connectData();
}, 3000);

client1.on('data', (data) => {
  console.log(`Data from server: ${data.toJSON()}`);
  const formattedData = catchData(data);
  console.log('formattedData', formattedData.get('BlkBegDaq').toString(16));
  // console.log('formattedData', formattedData.get('MdlGraScl'));
  console.log('formattedData', formattedData.get('BlkEndDaq').toString(16));
});
client1.on('close', () => {
  console.log('Connection closed');
});

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

module.exports = client1;
