const express = require('express');
const BurnController = require('./Controllers/BurnController');

const routes = express.Router();

routes.get('/', BurnController.getBurn);
routes.post('/', BurnController.postBurn);

module.exports = routes;
