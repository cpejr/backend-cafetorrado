const express = require('express');
const RoastController = require('./Controllers/RoastController');
const {
  connectToWifi, disconnectWifi, connectToDataPort, disconnectData, writeNewWifi,
} = require('./Clients/manager');

const wifiObs = require('./wifiObserver');

const routes = express.Router();
// Server side
routes.get('/', RoastController.get);
routes.get('/getUniqueRoastData/:roast_id', RoastController.getUniqueRoastData);

routes.delete('/deleteLastRoast', RoastController.deleteLast);

routes.post('/setChartParams', RoastController.create);
routes.post('/changeWifi', writeNewWifi);
routes.post('/sendData', RoastController.bounceToUpdate);

// socket side
routes.get('/connectWifi', connectToWifi);
routes.get('/disconnectWifi', disconnectWifi);

routes.get('/connectData', connectToDataPort);
routes.get('/disconnectData', disconnectData);

module.exports = routes;
