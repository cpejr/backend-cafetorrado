const express = require('express');
const BurnController = require('./controllers/BurnController');
const { connectToWifi, disconnectWifi } = require('./Clients/connectionManager');

const routes = express.Router();

routes.post('/', BurnController.create);
routes.get('/', BurnController.get);

routes.get('/connectWifi', connectToWifi);
routes.get('/disconnectWifi', disconnectWifi);

// routes.post('/wifiName', writeNewWifi);

module.exports = routes;
