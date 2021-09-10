const express = require('express');
const RoastController = require('./Controllers/RoastController');
const {
  connectToParameters, connectToDataPort, disconnectData, writeNewWifi,
} = require('./Clients/manager');

const routes = express.Router();
// Server side
routes.get('/', RoastController.get);
routes.get('/getUniqueRoastData/:roast_id', RoastController.getUniqueRoastData);

routes.delete('/deleteLastRoast', RoastController.deleteLast);
routes.delete('/deleteSpecificRoast/:roast_id', RoastController.deleteSpecific);

routes.post('/setChartParams', RoastController.create);
routes.post('/changeWifi', writeNewWifi);
routes.post('/sendData', RoastController.bounceToData);
routes.post('/setMachineParameters', RoastController.bounceToParameters);
routes.post('/sendMachineParameters', RoastController.sendParameters);
routes.post('/sendStaticLUTs/:roast_id', RoastController.sendStaticParameters);

// socket side
routes.get('/connectData', connectToDataPort);
routes.get('/disconnectData', disconnectData);

routes.get('/connectParameters', connectToParameters);

module.exports = routes;
