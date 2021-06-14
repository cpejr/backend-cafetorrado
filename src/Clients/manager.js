const net = require('net');
const { connectWifi } = require('./client_internet');
const { connectData } = require('./client_data');
const { wifiDataToBuffer } = require('../Structs/wifi_converter');
const { io } = require('../Socket/Assets');
const { safeEject } = require('./errorTreatment');

/*eslint-disable*/
let clientWifi;
let clientData;
let wifiData;

const standByDataPort = new net.Socket()
const reconnect = () => {
  !(!!standByDataPort) ? 
  ((standByDataPort = new net.Socket()) && reconnect()
  ) : (
  safeEject.run(() => {
    console.log('tentando conectar')
    standByDataPort.connect(888, '192.168.5.1', () => {
      io.emit('wifiStatus', true)
      standByDataPort.on('error', (err) => {throw err;})
    })  
  })
  )
}


async function connectToWifi(req, res) {
  standByDataPort && standByDataPort.destroy()
  if (!clientWifi) {
    try {
      [clientWifi, wifiData] = await connectWifi()
      return res.status(200).json({ Message: 'Connection to Wifi configuration PORT estabilished', wifiData });
    } catch (error) {
      return res.status(500).json({ Message: 'Connection to Wifi configuration PORT failed' });
    }
  } else {
    return res.status(201).json({ Message: 'Connection already estabilished with one of the ports', wifiData });
  }
}

async function disconnectWifi(req, res) {
  if (clientWifi) {
    try {
      clientWifi.destroy();
      clientWifi = null;
      reconnect()
      return res.status(200).json({ Message: 'Connection to Wifi configuration PORT terminated' });
    } catch (error) {
      return res.status(500).json({ Message: 'Connection to Wifi configuration PORT termination failed' });
    }
  }
  return res.status(201).json({ Message: 'There was no connection to Wifi configuration PORT' });
}

async function connectToDataPort(req, res) {
  standByDataPort && standByDataPort.destroy()
  if (!clientWifi) {
    try {
      await connectData();
      return res.status(200).json({ Message: 'Connection to data PORT estabilished' });
    } catch (error) {
      return res.status(500).json({ Message: 'Connection to data PORT failed' });
    }
  } else {
    return res.status(201).json({ Message: 'Connection already estabilished with one of the ports' });
  }
}

async function disconnectData(req, res) {
  if (clientData) {
    try {
      clientData.destroy();
      clientData = null;
      reconnect();
      return res.status(200).json({ Message: 'Connection to data PORT terminated' });
    } catch (error) {
      return res.status(500).json({ Message: 'Connection to data PORT termination failed' });
    }
  }
  return res.status(201).json({ Message: 'There was no connection to data PORT' });
}

async function writeNewWifi(req, res) {
  standByDataPort && standByDataPort.destroy()
  if (clientWifi) {
    try {
      const { wifiName, password, hidden } = req.body;
      const buffer = await wifiDataToBuffer({ wifiName, password, hidden });
      clientWifi.write(buffer);
      clientWifi = null;
      reconnect();
      return res.status(200).json({ Message: 'Sucessfully changes wifi info' });
    } catch (error) {
      return res.status(500).json({ Message: 'Could not change wifi configs' });
    }
  }
  return res.status(500).json({ Message: 'No connection established' });
}

reconnect();

module.exports = {
  connectToWifi, disconnectWifi, connectToDataPort, disconnectData, writeNewWifi, clientData, clientWifi, reconnect
};
