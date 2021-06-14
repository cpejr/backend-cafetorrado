const wifi = require('node-wifi');
const net = require('net');
const { getWifiName, setWifiName } = require('./Models/wifiModel');
const { io } = require('./Socket/Assets');
const { clientData, clientWifi } = require('./Clients/manager');

wifi.init({ iface: null });

const checker = async (currentName) => {
  const { safeEject } = require('./Clients/errorTreatment');
  safeEject.run(() => {
    wifi.getCurrentConnections((error, current) => {
      console.log(current[0].ssid, currentName.name);
      if (error || !current || current[0].ssid !== currentName.name) { return false; }
      if (current[0].ssid === currentName.name) { return true; }
    });
  });
};

const checkWifiConnection = async () => {
  const currentName = await getWifiName();
  const status = await checker(currentName);
  return status;
};

io.on('newPassword', (newName) => {
  setWifiName(newName);
});

module.exports = { checkWifiConnection };
