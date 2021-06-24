const net = require('net');
const { safeEject } = require('./errorTreatment');
const { create_par_t } = require('../Structs/par_t');
const { send_par_t } = require('../Structs/send_par_t');

let asyncConnect = 0;
const bufArr = [];

async function connectMachineParams() {
  let client = new net.Socket();
  safeEject.run(() => new Promise((resolve, reject) => {
    try {
      client.connect(888, '192.168.5.1', () => {
        console.log('Client: LUT connection established with server');

        client.on('close', () => {
          console.log('LUT Connection closed');
        });

        client.on('data', async (data) => {
          bufArr.push(data);
          if (!asyncConnect) { asyncConnect += 1; return; }
          const buffer = Buffer.concat(bufArr);
          const unpacked = create_par_t(buffer);
          console.log(unpacked.fields.MdlWupChr.Bkp_x[0]);
          await client.destroy();
          await (client = null);
          resolve(unpacked);
        });
      });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  }));
}

async function sendMachineParams() {
  let client = new net.Socket();
  safeEject.run(() => new Promise((resolve, reject) => {
    try {
      client.connect(888, '192.168.5.1', async () => {
        console.log('Client: LUT connection established with server');
        client.on('close', () => {
          console.log('Wifi configuration connection closed');
        });
        console.log(send_par_t());
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

module.exports = { connectMachineParams, sendMachineParams };
