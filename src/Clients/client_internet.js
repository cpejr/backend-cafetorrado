const net = require('net');
/* const fs = require('fs'); */
/* const path = require('path'); */
/* const { formatServerData } = require('../Structs/DataStruct');
*/
const { wifiBufferToData } = require('../Structs/wifi_converter');

let formattedData;
async function connectWifi() {
  const client = new net.Socket();
  return new Promise((resolve) => {
    client.connect(555, '192.168.5.1', () => {
      console.log('Client: Wifi connection established with server');
      client.write('Connected');

      client.on('close', () => {
        console.log('Wifi configuration connection closed');
      });

      client.on('data', (data) => {
        formattedData = wifiBufferToData(data);
        resolve([client, formattedData]);
      });
    });
  });
}

module.exports = { connectWifi };
