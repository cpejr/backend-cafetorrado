const express = require('express');
const BurnController = require('./Controllers/BurnController');

const routes = express.Router();

routes.post('/', BurnController.create);
routes.get('/', BurnController.get);

module.exports = routes;
