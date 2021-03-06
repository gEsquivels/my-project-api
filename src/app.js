const express = require('express');
const helmet = require('helmet');
const cron = require('node-cron');
const { errors } = require('celebrate');

require('./database');
const routes = require('./routes');
const accessAuthorization = require('./app/middlewares/accessAuthorization');
const checkProjectsLate = require('./app/functions/checkProjectsLate');
const jwtCheck = require('./app/middlewares/accessAuthorization');

const app = express();

app.use(accessAuthorization);
app.use(helmet());
app.use(express.json());
app.use(routes);
app.use(errors());
//app.use(jwtCheck);

cron.schedule('30 12 * * *', () => {
  checkProjectsLate();
}, {
  scheduled: true,
  timezone: "America/Sao_Paulo"
});

module.exports = app;
