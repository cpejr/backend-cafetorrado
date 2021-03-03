const express = require('express');
const morgan = require('morgan');
const routes = require('./Routes');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Acess-Control-Allow-Origin',
    'Origin, X-requested-with, Content-type, Access-Control-Allow-Header',
  );

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).send({});
  }

  next();
});

app.use(routes);

// Error treatment

app.use((req, res, next) => {
  const err = new Error('Route not found');
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  return res.send({
    error: err.message,
  });
});

module.exports = app;
