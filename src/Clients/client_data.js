// Client que utilizara a porta 555 e recebera os parametros da maquina
// const net = require('net');
// const { Struct } = require('struct');

// const { client1 } = require('./client_internet');

// function parseData(buffer){
// const serverData = new Struct()
//               .('float', 'MdlAirScl');

//   serverData._setBuff(buffer);
//   return serverData;
// }
function connectData(socket) {
  // setTimeout(() => {
  //   ref_.connect(888, '192.164.5.1', () => {
  //     console.log('Client 2: connection established with server');
  //     ref_.write('Connected');
  //     ref_.on('data', (data) => {
  //       console.log(data.toString());
  //     });
  //   }, 5000);
  // });
}
// connectData();
// client2.setEncoding('utf-8');

// client2.on('data', (data) => {
//   console.log(`Data from server: ${data}`);
// });
// client2.on('close', () => {
//   console.log('Connection closed');
// });

module.exports = { connectData };
