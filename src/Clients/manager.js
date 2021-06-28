const net = require('net');
const { connectMachineParams, sendMachineParams } = require('./client_LUTs');
const { connectData } = require('./client_data');
const { wifiDataToBuffer } = require('../Structs/wifi_converter');
const { io } = require('../Socket/Assets');
const { safeEject } = require('./errorTreatment');
const { client } = require('../database/connection');

let clientWifi; let params; let clientData; let clientParam; let result; let wifiData;

let standByDataPort = new net.Socket();
let done = false;
const reconnect = () => {
  safeEject.run(
    () => {
      if (!done) { done = true; setTimeout(() => { done = false; }, 1000); return; }
      if (!standByDataPort) { standByDataPort = new net.Socket(); reconnect(); }
      console.log('Reconectando...');
      setTimeout(() => {
        standByDataPort.connect(888, '192.168.5.1', () => {
          console.log('Conectado');
          io.emit('wifiStatus', true);
          standByDataPort.on('error', (err) => { throw err; });
        });
      }, 2000);
    },
  );
};

async function connectToParameters(req, res) {
  if (standByDataPort) { standByDataPort.destroy(); (standByDataPort = null); }
  if (!clientWifi) {
    try {
      params = await connectMachineParams();
      return res.status(200).json({ Message: 'Connection to Parameters configuration PORT estabilished', params });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ Message: 'Connection to Parameters configuration PORT failed' });
    }
  } else {
    return res.status(201).json({ Message: 'Connection already estabilished with one of the ports', wifiData });
  }
}

async function disconnectParameters(req, res) {
  if (standByDataPort) { standByDataPort.destroy(); (standByDataPort = null); }
  if (clientWifi && !clientData) {
    try {
      await clientWifi.destroy();
      clientWifi = null;
      return res.status(200).json({ Message: 'Connection to Wifi configuration PORT terminated' });
    } catch (error) {
      return res.status(500).json({ Message: 'Connection to Wifi configuration PORT termination failed' });
    }
  }
  return res.status(201).json({ Message: 'There was no connection to Wifi configuration PORT' });
}

async function connectToDataPort(req, res) {
  if (standByDataPort) { standByDataPort.destroy(); (standByDataPort = null); }
  if (!clientWifi) {
    try {
      clientData = await connectData();
      return res.status(200).json({ Message: 'Connection to data PORT estabilished' });
    } catch (error) {
      return res.status(500).json({ Message: 'Connection to data PORT failed' });
    }
  } else {
    return res.status(201).json({ Message: 'Connection already estabilished with one of the ports' });
  }
}

async function disconnectData(req, res) {
  if (standByDataPort) { standByDataPort.destroy(); (standByDataPort = null); }
  if (clientData) {
    try {
      await clientData.destroy();
      await (clientData = null);
      return res.status(200).json({ Message: 'Connection to data PORT terminated' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ Message: 'Connection to data PORT termination failed' });
    }
  }
  return res.status(201).json({ Message: 'There was no connection to data PORT' });
}

async function writeNewWifi(req, res) {
  if (standByDataPort) { standByDataPort.destroy(); (standByDataPort = null); }
  if (clientWifi && !clientData) {
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

async function sendNewParameters() {
  // if (standByDataPort) { standByDataPort.destroy(); (standByDataPort = null); }
  try {
    const res = await sendMachineParams();
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = {
  connectToParameters, disconnectParameters, connectToDataPort, disconnectData, writeNewWifi, clientData, clientWifi, reconnect, sendNewParameters,
};
