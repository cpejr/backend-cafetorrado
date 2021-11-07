const fs = require('fs');
const path = require('path');
const net = require('net');
const { unpack_memvar_t } = require('../Structs/memvar_t');
const { io } = require('../Socket/Assets')
const { performance } = require('perf_hooks')
const { send_vin_t } = require('../Structs/send_vin_t');
const { parseHex } = require('../Structs/InvDgoSet');
const hexToBinary = require('hex-to-binary')
const { safeEject } = require('./errorTreatment')

let separator = '';

let after = Date.now();

let isFirst = true;

async function connectData() {
  fs.mkdir(path.join('src/RoastArchive', 'TEMPORARY'), 0777, (err) => {
    if (err) {
      fs.truncateSync(path.join('src/RoastArchive/TEMPORARY/DataStructs'), 0)
      fs.truncateSync(path.join('src/RoastArchive/TEMPORARY/ParsedData.json'), 0)
    }
    fs.appendFile(path.join('src/RoastArchive/TEMPORARY', 'DataStructs'), '', (err) => { if (err) throw err; })
    fs.appendFile(path.join('src/RoastArchive/TEMPORARY', 'ParsedData.json'), '[\n', (err) => { if (err) throw err; })
  })

  const client = new net.Socket();
  safeEject.run(() => {
    try {
      client.connect(888, '10.10.10.100', () => {

        console.log('Client 1: Data connection established with server');

        client.on('close', () => {
          fs.appendFile(path.join('src/RoastArchive/TEMPORARY', 'ParsedData.json'), '\n]', (err) => { if (err) throw err; })
          separator = '';
          client.destroy();
          console.log('Data connection closed');
        });

        client.on('data', (data) => {

          if (isFirst) {
            isFirst = false;
            return; // ignora o primeiro
          }

          const unpacked = unpack_memvar_t(data);
          console.log("Dado que chega = ", Date.now() - after, data.toString('hex'));

          const headers = {
            BlkBegVin: unpacked.get('BlkBegVin').toString(16),
            BlkEndVin: unpacked.get('BlkEndVin').toString(16),
            BlkBegVou: unpacked.get('BlkBegVou').toString(16),
            BlkEndVou: unpacked.get('BlkEndVou').toString(16),
          }
          if (headers.BlkBegVin === 'aaaaaaaa' && headers.BlkEndVin === 'bbbbbbbb' &&
            headers.BlkBegVou === 'cccccccc' && headers.BlkEndVou === 'dddddddd') {
            io.emit('realData', unpacked);
            console.log(unpacked.fields.MdlModSts)
            console.log(unpacked.fields.MdlManChr)

            fs.appendFile(path.join('src/RoastArchive/TEMPORARY', 'DataStructs'), data, (err) => { if (err) throw err; })
            fs.appendFile(path.join('src/RoastArchive/TEMPORARY', 'ParsedData.json'), separator + JSON.stringify(unpacked.fields), 'utf-8', (err) => { if (err) throw err; })
            if (!separator) separator = ',\n';
            console.log("Dado que envia = ", send_vin_t());
            client.write(send_vin_t())

            after = Date.now();
          }
        });
      });
    } catch (err) {
      console.error(err)
    }
  })
  return client;
}

module.exports = { connectData };
