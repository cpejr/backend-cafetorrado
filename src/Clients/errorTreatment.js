/* eslint-disable no-unused-expressions */
const domain = require('domain');
const { io, socketListener } = require('../Socket/Assets');
const { checkWifiConnection } = require('../wifiObserver');

const safeEject = domain.create();
const runtimeException = { status: false };
const exceptionStatus = () => runtimeException.status;
// const errorDictionary = [
//   'ETIMEDOUT',
//   'ECONNREFUSED',
//   'ECONNRESET',
//   'NotConnected',
//   'wrongConnection',
// ];

const unknownError = (err) => {
  console.error('This is an unknown error', err);
};

safeEject.on('error', async (err) => {
  console.log('errou', err);
  // const jsonError = JSON.parse(JSON.stringify(err));
  // if (!(errorDictionary.includes(jsonError.code))) unknownError(jsonError);
  io.emit('wifiStatus', false);
  runtimeException.status = true;
});

module.exports = { safeEject, exceptionStatus };
