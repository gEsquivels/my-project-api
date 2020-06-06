const express = require('express');
const helmet = require('helmet');
const { errors } = require('celebrate');

require('./database');
const routes = require('./routes');
const accessAuthorization = require('./app/middlewares/accessAuthorization');

const app = express();

app.use(accessAuthorization);
app.use(helmet());
app.use(express.json());
app.use(routes);
app.use(errors());

module.exports = app;
