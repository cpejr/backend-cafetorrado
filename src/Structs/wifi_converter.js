/* eslint-disable radix */
const { Struct } = require('struct');

function wifiBufferToData(buffer) {
  const wifi = new Struct()
    .word32Ule('Beg')
    .charsnt('Sid', 31)
    .charsnt('Pas', 31)
    .word8('Chn')
    .word8('Hid')
    .word32Ule('End');
    // eslint-disable-next-line
    wifi._setBuff(buffer);

  const {
    Beg, Sid, Pas, Chn, Hid, End,
  } = wifi.fields;

  const obj = {
    Beg: Beg.toString(16), Sid, Pas, Chn, Hid, End: End.toString(16),
  };

  return obj;
}
function wifiDataToBuffer({ wifiName, password, hidden }) {
  const wifi = new Struct()
    .word32Ule('Beg')
    .charsnt('Sid', 31)
    .charsnt('Pas', 31)
    .word8('Chn')
    .word8('Hid')
    .word32Ule('End');

  wifi.allocate();
  const buf = wifi.buffer();

  for (let i = 0; i < buf.length; i += 1) {
    buf[i] = 0;
  }
  const proxy = wifi.fields;

  proxy.Beg = parseInt('0x44444444');
  proxy.Sid = wifiName;
  proxy.Pas = password;
  proxy.Chn = 13;
  proxy.Hid = hidden;
  proxy.End = parseInt('0x55555555');

  return buf;
}

module.exports = { wifiBufferToData, wifiDataToBuffer };
