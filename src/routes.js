const express = require('express');
const BurnController = require('./Controllers/BurnController');
const {writeNewWifi} = require('./Clients/client_internet');

const routes = express.Router();

routes.post('/', BurnController.create);
routes.get('/', BurnController.get);

routes.post('/wifiName', writeNewWifi)

module.exports = routes;
