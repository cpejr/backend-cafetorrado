/* eslint-disable no-unused-expressions */
const domain = require('domain');
const { io } = require('../Socket/Assets');
const { checkWifiConnection } = require('../wifiObserver');
const { reconnect } = require('./manager');

const errorDictionary = [
  'ETIMEDOUT',
  'ECONNREFUSED',
];
const safeEject = domain.create();

safeEject.on('error', (err) => {
  const jsonError = JSON.parse(JSON.stringify(err));
  if (!(errorDictionary.includes(jsonError.code))) unknownError(jsonError);
  io.emit('wifiStatus', false);
  io.on('renewConnection', async () => {
    (await checkWifiConnection()) && (io.emit('wifiStatus', true) && reconnect());
  });
});

const unknownError = (err) => {
  console.log('This is an unknown error');
};
module.exports = { safeEject };
