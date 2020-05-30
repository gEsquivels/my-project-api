const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

require('./database');
const routes = require('./routes');
const accessAuthorization = require('./app/middlewares/accessAuthorization');

const app = express();

app.use(accessAuthorization);

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(routes);

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

module.exports = app;
