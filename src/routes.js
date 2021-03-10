const express = require('express');
const BurnController = require('./Controllers/BurnController');
const FileController = require('./Controllers/FileController');

const routes = express.Router();

routes.post('/txt', FileController.createTxt);
routes.post('/', BurnController.create);
routes.get('/', BurnController.get);

module.exports = routes;
