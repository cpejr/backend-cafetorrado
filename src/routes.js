const express = require('express');
const RoastController = require('./Controllers/RoastController');
const {
  connectToWifi, disconnectWifi, connectToDataPort, disconnectData,
} = require('./Clients/connectionManager');

const routes = express.Router();
// Server side
routes.get('/', RoastController.get);
routes.post('/setChartParams', RoastController.create);
routes.delete('/deleteLastRoast', RoastController.deleteLast);
routes.get('/getUniqueRoastData/:roast_id', RoastController.getUniqueRoastData);
// socket side
routes.get('/connectWifi', connectToWifi);
routes.get('/disconnectWifi', disconnectWifi);

routes.get('/connectData', connectToDataPort);
routes.get('/disconnectData', disconnectData);

// routes.post('/wifiName', writeNewWifi);

module.exports = routes;
