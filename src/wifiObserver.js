const wifi = require('node-wifi');
const net = require('net');
const { getWifiName, setWifiName } = require('./Models/wifiModel');
const { io } = require('./Socket/Assets');
const { clientData, clientWifi } = require('./Clients/manager');

wifi.init({ iface: null });

const checkWifiConnection = async () => {
  const currentName = await getWifiName();
  wifi.getCurrentConnections((error, current) => {
    if (error) console.error(error);
    if (current[0].ssid === currentName) { io.emit('wifiStatus', true); return; }
    io.emit('wifiStatus', false);
  });
};

io.on('newPassword', (newName) => {
  setWifiName(newName);
});
