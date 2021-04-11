const { Struct } = require('struct');

function formatWifiData(buffer) {
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

module.exports = { formatWifiData };
