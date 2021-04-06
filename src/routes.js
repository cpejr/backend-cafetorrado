const express = require('express');
const BurnController = require('./controllers/BurnController');
const {
  connectToWifi, disconnectWifi, connectToDataPort, disconnectData,
} = require('./Clients/connectionManager');

const routes = express.Router();

routes.post('/', BurnController.create);
routes.get('/', BurnController.get);

routes.get('/connectWifi', connectToWifi);
routes.get('/disconnectWifi', disconnectWifi);

routes.get('/connectData', connectToDataPort);
routes.get('/disconnectData', disconnectData);

// routes.post('/wifiName', writeNewWifi);

module.exports = routes;
