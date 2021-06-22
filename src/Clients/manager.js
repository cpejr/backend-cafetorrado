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

let standByDataPort = new net.Socket()
let done = false;
const reconnect = () => {
  safeEject.run(
    () => {
      if(!done){done = true; setTimeout(()=> {done = false}, 1000); return}
      if(!(!!standByDataPort)){ standByDataPort = new net.Socket() ; reconnect() }
      console.log('Reconectando...')
      setTimeout(()=>{
        standByDataPort.connect(888, '192.168.5.1', () => {
        console.log('Conectado')
        io.emit('wifiStatus', true)
        standByDataPort.on('error', (err) => {throw err;})
      })  
    }, 2000)
  })
}


async function connectToWifi(req, res) {
  if(standByDataPort) { standByDataPort.destroy(); (standByDataPort = null) }
  if (!clientWifi && !clientData ) {
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
  if(standByDataPort) { standByDataPort.destroy(); (standByDataPort = null) }
  if (clientWifi && !clientData) {
    try {
      await clientWifi.destroy();
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
  if(standByDataPort) { standByDataPort.destroy(); (standByDataPort = null) }
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

function disconnectData(req, res) {
  if(standByDataPort) { standByDataPort.destroy(); (standByDataPort = null) }
  if (clientData) {
    return new Promise((resolve, reject) => {
      try {
        clientData.destroy().then(() => {
          clientData = null;
          reconnect();
          resolve(res.status(200).json({ Message: 'Connection to data PORT terminated' }));
        });
      } catch (error) {
        reject(res.status(500).json({ Message: 'Connection to data PORT termination failed' }));
      }
    })
  }
  return res.status(201).json({ Message: 'There was no connection to data PORT' });
}

async function writeNewWifi(req, res) {
  if(standByDataPort) { standByDataPort.destroy(); (standByDataPort = null) }
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

module.exports = {
  connectToWifi, disconnectWifi, connectToDataPort, disconnectData, writeNewWifi, clientData, clientWifi, reconnect
};
