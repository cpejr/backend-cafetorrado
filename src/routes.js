/* eslint-disable */
const express = require('express');
const RoastController = require('./Controllers/RoastController');
const MarkController = require('./Controllers/MarkController');

const {
  connectToParameters, connectToDataPort, disconnectData, writeNewWifi,
} = require('./Clients/manager');
const ThemeController = require('./Controllers/ThemeController');
const { sendMachineParams } = require('./Clients/client_LUTs');
const LoginController = require('./Controllers/LoginController');
const UserModel = require('./Models/UserModel');
const UserController = require('./Controllers/UserController');

const routes = express.Router();
// Server side

routes.get('/', RoastController.get);
routes.get('/getUniqueRoastData/:roast_id', RoastController.getUniqueRoastData);
routes.get('/getLastTheme', ThemeController.get);
routes.get('/marks/:roast_id', MarkController.getByRoastId);

routes.delete('/deleteLastRoast', RoastController.deleteLast);
routes.delete('/deleteSpecificRoast/:roast_id', RoastController.deleteSpecific);

routes.post('/setChartParams', RoastController.create);
routes.post('/saveMark/:roast_id', MarkController.create);
routes.post('/changeWifi', writeNewWifi);
routes.post('/sendData', RoastController.bounceToData);
routes.post('/setMachineParameters', RoastController.bounceToParameters);
routes.post('/sendMachineParameters', RoastController.sendParameters);
routes.post('/sendStaticLUTs/:roast_id', RoastController.sendStaticParameters);

routes.put('/updateLastTheme', ThemeController.updateLastTheme);

// socket side
routes.get('/connectData', connectToDataPort);
routes.get('/disconnectData', disconnectData);
routes.get('/connectParameters', connectToParameters);

// session/user
routes.post('/signUp', UserController.create);
routes.post('/login', LoginController.signIn);

module.exports = routes;
