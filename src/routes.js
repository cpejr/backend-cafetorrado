const express = require('express');
const RoastController = require('./Controllers/RoastController');
const {
  connectToWifi, disconnectWifi, connectToDataPort, disconnectData,
} = require('./Clients/connectionManager');

const routes = express.Router();
// Server side
routes.post('/setChartParams', RoastController.create);
routes.get('/', RoastController.get);
routes.delete('/deleteLastRoast', RoastController.deleteLast);

// socket side
routes.get('/connectWifi', connectToWifi);
routes.get('/disconnectWifi', disconnectWifi);

routes.get('/connectData', connectToDataPort);
routes.get('/disconnectData', disconnectData);

// routes.post('/wifiName', writeNewWifi);

module.exports = routes;
