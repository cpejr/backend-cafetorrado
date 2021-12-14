const express = require('express');
require('dotenv').config({ path: `${__dirname}/.env` });
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes');

const app = express();

const corsOptions = {
  exposedHeaders: 'X-Total-Count',
};

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());

app.use(routes);

// Error treatment

app.use((req, res, next) => {
  const err = new Error('Route not found');
  err.status = 404;
  next(err);
});
app.use((err, req, res) => {
  res.status(err.status || 500);
  return res.send({
    error: err.message,
  });
});

module.exports = app;
