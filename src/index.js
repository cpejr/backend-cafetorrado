const express = require('express');

const bodyParser = require('body-parser');
const routes = require('./routes');

const port = 3333;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
