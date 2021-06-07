const wifi = require('node-wifi');

const { getWifiName, setWifiName } = require('./Models/wifiModel');
const { io } = require('./Socket/Assets');

wifi.init({ iface: null });

const checkWifiConnection = async () => {
  const currentName = await getWifiName();
  wifi.getCurrentConnections((error, current) => {
    if (error) console.error(error);
    if (current[0].ssid === currentName) return;
    io.emit('wrongWifi');
  });
};

io.on('newPassword', (newName) => {
  setWifiName(newName);
});

setInterval(() => {
  checkWifiConnection();
}, 60 * 5);
