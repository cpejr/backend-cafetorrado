/* eslint-disable no-unused-expressions */
const domain = require('domain');
const { io, socketListener } = require('../Socket/Assets');
const { checkWifiConnection } = require('../wifiObserver');
const { reconnect } = require('./manager');

const safeEject = domain.create();
const errorDictionary = [
  'ETIMEDOUT',
  'ECONNREFUSED',
  'ECONNRESET',
  'NotConnected',
  'wrongConnection',
];
const requestEmission = () => new Promise((resolve) => {
  safeEject.run(() => {
    const socket = socketListener();
    socket.on('renewConnection', async () => {
      const isConnected = await checkWifiConnection();
      console.log('aasasas');
      console.log(isConnected);
      if (!isConnected) { requestEmission(); }
      console.log('ESTÁ CONECTADO');
      io.emit('wifiStatus', true);
      resolve(true);
    });
  });
});

const unknownError = (err) => {
  console.error('This is an unknown error', err);
};

safeEject.on('error', async (err) => {
  const jsonError = JSON.parse(JSON.stringify(err));
  console.log(jsonError);
  // if (!(errorDictionary.includes(jsonError.code))) unknownError(jsonError);
  io.emit('wifiStatus', false);
  const front = await requestEmission();
  console.log(front);
  console.log('CHEGOU AQUI DEPOIS DE TER SIDO TERMINADO');
  // });
});

module.exports = { safeEject };
