const wifi = require('node-wifi');
const { getWifiName, setWifiName } = require('./Models/wifiModel');
const { safeEject } = require('./Clients/errorTreatment');
// const net = require('net');
// const { io } = require('./Socket/Assets');
// const { clientData, clientWifi } = require('./Clients/manager');

wifi.init({ iface: null });

const checker = async (currentName) => new Promise((resolve) => {
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
  safeEject.run(
    async () => {
      const currentName = await getWifiName();
      const status = await checker(currentName);
      resolve(status);
    },
  );
});

module.exports = { checkWifiConnection };
