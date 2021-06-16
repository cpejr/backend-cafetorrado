/* eslint-disable no-unused-expressions */
const domain = require('domain');
const { io, socketListener } = require('../Socket/Assets');
const { checkWifiConnection } = require('../wifiObserver');

const safeEject = domain.create();
const errorDictionary = [
  'ETIMEDOUT',
  'ECONNREFUSED',
  'ECONNRESET',
  'NotConnected',
  'wrongConnection',
];
const requestEmission = async () => {
  const { reconnect } = require('./manager');
  const socket = socketListener();

  safeEject.run(
    () => {
      socket.on('renewConnection', async () => {
        const status = await checkWifiConnection();
        if (!status) { return; }
        io.emit('wifiStatus', true);
        reconnect();
        // socket.off('renewController');
      });
    },
  );
};

const unknownError = (err) => {
  console.error('This is an unknown error', err);
};

safeEject.on('error', async (err) => {
  // console.log('errou', err);
  // const jsonError = JSON.parse(JSON.stringify(err));
  // if (!(errorDictionary.includes(jsonError.code))) unknownError(jsonError);
  io.emit('wifiStatus', false);
  requestEmission();
});

module.exports = { safeEject };
