const express = require('express');

const router = express.Router();

exports.getBurn = (req, res, next) => {
  console.log('chega aqui?');
  res.status(200).send({
    message: 'using get route',
  });
};

exports.postBurn = (req, res, next) => {
  const burn = {
    name: req.body.name,
  };
  res.status(201).send({
    message: 'Torra criada',
    burn_created: burn,
  });
};
