const express = require('express');
const RoastController = require('./Controllers/RoastController');
const {
  connectToWifi, disconnectWifi, connectToDataPort, disconnectData, writeNewWifi,
} = require('./Clients/manager');
const { CommandData } = require('./Structs/toStruct_cmdData');

const routes = express.Router();
// Server side
routes.get('/', RoastController.get);
routes.post('/setChartParams', RoastController.create);
routes.delete('/deleteLastRoast', RoastController.deleteLast);
routes.get('/getUniqueRoastData/:roast_id', RoastController.getUniqueRoastData);
routes.post('/changeWifi', writeNewWifi);

// socket side
routes.get('/connectWifi', connectToWifi);
routes.get('/disconnectWifi', disconnectWifi);

routes.get('/connectData', connectToDataPort);
routes.get('/disconnectData', disconnectData);

routes.post('/sendData', CommandData);
module.exports = routes;
