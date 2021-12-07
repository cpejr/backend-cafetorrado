const net = require('net');
const { safeEject } = require('./errorTreatment');
const { create_par_t } = require('../Structs/par_t');
const { send_par_t } = require('../Structs/send_par_t');

let asyncConnect = 0;
const bufArr = [];

async function connectMachineParams() {
  let client = new net.Socket();
  return safeEject.run(() => new Promise((resolve, reject) => {
    try {
      client.connect(555, '192.168.5.1', () => {
        client.on('close', () => {
        });

        client.on('data', async (data) => {
          bufArr.push(data);
          if (!asyncConnect) { asyncConnect += 1; return; }
          const buffer = Buffer.concat(bufArr);
          const unpacked = create_par_t(buffer);
          await client.destroy();
          await (client = null);
          asyncConnect = 0;
          resolve(unpacked);
        });
      });
    } catch (error) {
      reject(error);
    }
  }));
}

async function sendMachineParams() {
  let client = new net.Socket();
  return safeEject.run(() => new Promise((resolve, reject) => {
    try {
      client.connect(555, '192.168.5.1', async () => {
        client.on('close', () => {
        });
        await client.write(send_par_t());
        await client.destroy();
        await (client = null);
        resolve([client]);
      });
    } catch (error) {
      reject(error);
    }
  }));
}

async function sendStaticParams(BUFFERLut = Buffer.alloc(2548)) {
  let client = new net.Socket();
  return safeEject.run(() => new Promise((resolve, reject) => {
    try {
      client.connect(555, '192.168.5.1', async () => {
        client.on('close', () => {
        });

        await client.write(BUFFERLut);
        await client.destroy();
        await (client = null);
        resolve([client]);
      });
    } catch (error) {
      reject(error);
    }
  }));
}

module.exports = { connectMachineParams, sendMachineParams, sendStaticParams };
