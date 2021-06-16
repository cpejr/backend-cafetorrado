const wifi = require('node-wifi');
const net = require('net');
const { getWifiName, setWifiName } = require('./Models/wifiModel');
const { io } = require('./Socket/Assets');
const { clientData, clientWifi } = require('./Clients/manager');

wifi.init({ iface: null });

const checker = async (currentName) => new Promise((resolve) => {
  const { safeEject } = require('./Clients/errorTreatment');
  safeEject.run(
    async () => {
      wifi.getCurrentConnections((error, current) => {
        if (error) throw error;
        if (!current || current[0].ssid !== currentName.name) resolve(false);
        console.log(current[0].ssid, currentName.name);
        if (current[0].ssid === currentName.name) resolve(true);
      });
    },
  );
});

const checkWifiConnection = () => new Promise((resolve) => {
  const { safeEject } = require('./Clients/errorTreatment');

  safeEject.run(
    async () => {
      console.log('chegou aqui');
      const currentName = await getWifiName();
      const status = await checker(currentName);
      resolve(status);
    },
  );
});

io.on('newPassword', (newName) => {
  setWifiName(newName);
});

module.exports = { checkWifiConnection };
