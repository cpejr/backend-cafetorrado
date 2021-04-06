const { connectWifi } = require('./client_internet');

let clientWifi;

async function connectToWifi(req, res) {
  if (!clientWifi) {
    try {
      clientWifi = connectWifi();
      return res.status(200).json({ Message: 'Connection to Wifi configuration PORT estabilished' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ Message: 'Connection to Wifi configuration PORT failed' });
    }
  } else {
    return res.status(201).json({ Message: 'Connection already estabilished with Wifi configuration PORT' });
  }
}

async function disconnectWifi(req, res) {
  if (clientWifi) {
    try {
      clientWifi.destroy();
      clientWifi = null;
      return res.status(200).json({ Message: 'Connection to Wifi configuration PORT terminated' });
    } catch (error) {
      return res.status(500).json({ Message: 'Connection to Wifi configuration PORT termination failed' });
    }
  }
  return res.status(201).json({ Message: 'There was no connection to Wifi configuration PORT' });
}

let clientData;

async function connectToDataPort(req, res) {
  if (!clientData) {
    try {
      clientData = connectWifi();
      return res.status(200).json({ Message: 'Connection to data PORT estabilished' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ Message: 'Connection to data PORT failed' });
    }
  } else {
    return res.status(201).json({ Message: 'Connection already estabilished with data PORT' });
  }
}

module.exports = { connectToWifi, disconnectWifi };
