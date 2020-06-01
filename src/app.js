const express = require('express');
const helmet = require('helmet');

require('./database');
const routes = require('./routes');
const accessAuthorization = require('./app/middlewares/accessAuthorization');

const app = express();

app.use(accessAuthorization);

app.use(helmet());

app.use(express.json());

app.use(routes);

module.exports = app;
