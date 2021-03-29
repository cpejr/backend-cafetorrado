const net = require('net');

const client1 = new net.Socket();

const { Struct } = require('struct');

function catchWifiInformations(buffer) {
  const wifi = new Struct()
    .word32Ule('Beg')
    .charsnt('Sid', 31)
    .charsnt('Pas', 31)
    .word8('Chn')
    .word8('Hid')
    .word32Ule('End');
  // eslint-disable-next-line
  wifi._setBuff(buffer);

  const formattedWifi = {
    Beg: Number(wifi.get('Beg')).toString(16),
    Sid: wifi.get('Sid'),
    Pas: wifi.get('Pas'),
    Chn: wifi.get('Chn'),
    Hid: wifi.get('Hid'),
    End: Number(wifi.get('End')).toString(16),
  };

  return formattedWifi;
}

try {
  client1.connect(555, '192.168.4.1', () => {
    console.log('Client 1: connection established with server');
    client1.write('Connected');
  });

  // client1.setEncoding('utf-8');

  client1.on('data', (data) => {
    console.log(`Data from server: ${data.toString()}`);
    const formattedData = catchWifiInformations(data);
    console.log('formattedData', formattedData);
  });

  client1.on('close', () => {
    console.log('Connection closed');
  });
} catch (e) {
  console.log(e);
}

module.exports = client1;
