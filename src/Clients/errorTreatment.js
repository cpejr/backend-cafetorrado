/* eslint-disable no-unused-expressions */
const domain = require('domain');
const { io, socketListener } = require('../Socket/Assets');
const { checkWifiConnection } = require('../wifiObserver');
const { reconnect } = require('./manager');

const errorDictionary = [
  'ETIMEDOUT',
  'ECONNREFUSED',
];

const requestEmission = () => new Promise((resolve) => {
  const socket = socketListener();
  socket.on('renewConnection', async () => {
    const isConnected = await checkWifiConnection();
    try {
      if (isConnected) {
        io.emit('wifiStatus', true);
        resolve(true);
      }
    } catch (err) {
      requestEmission();
    }
  });
});
const safeEject = domain.create();

safeEject.on('error', async (err) => {
  console.log('ERROU');
  const jsonError = JSON.parse(JSON.stringify(err));
  if (!(errorDictionary.includes(jsonError.code))) unknownError(jsonError);
  io.emit('wifiStatus', false);
  const front = await requestEmission();
  console.log('CHEGOU AQUI DEPOIS DE TER SIDO TERMINADO');
  // });
});

const unknownError = (err) => {
  console.log('This is an unknown error');
};
module.exports = { safeEject };
