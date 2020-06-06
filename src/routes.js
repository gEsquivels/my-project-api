const express = require('express');

const { celebrate, Joi, Segments } = require('celebrate');

const userController = require('./app/controllers/userController');
const loginController = require('./app/controllers/loginController');
const projectController = require('./app/controllers/projectController');
const taskController = require('./app/controllers/taskController');
const authMiddleware = require('./app/middlewares/auth');

const Route = express.Router();

//Initial rote
Route.get('/', (req, res) => {return res.status(200).json({ ok: true })});

//User rotes
Route.post('/register', celebrate({
  [Segments.BODY]: Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}), userController.create);

Route.post('/login', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}), loginController.login);

Route.post('/forgotpassword', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required(),
  }),
}), userController.forgotPassword);

Route.post('/resetpassword', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required(),
    token: Joi.string().required(),
    new_password: Joi.string().required(),
  }),
}), userController.resetPassword);


//Projects routes
Route.get('/projects', authMiddleware, projectController.view);

Route.post('/projects', celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    completion_date: Joi.string(),
    status: Joi.number().integer().required(),
  }),
  [Segments.HEADERS]: {
    authorization: Joi.string().required()
  }.unknown()
}), authMiddleware, projectController.create);

Route.patch('/projects/:projectid', celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
    completion_date: Joi.string(),
    status: Joi.number().integer(),
  }),
  [Segments.HEADERS]: {
    authorization: Joi.string().required()
  }.unknown()
}), authMiddleware, projectController.patch);

Route.delete('/projects/:projectid', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    projectid: Joi.number().integer().required(),
  }),
  [Segments.HEADERS]: {
    authorization: Joi.string().required()
  }.unknown()
}), authMiddleware, projectController.dalete);


//Tasks routes
Route.get('/tasks/:projectid', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    projectid: Joi.number().integer().required(),
  }),
  [Segments.HEADERS]: {
    authorization: Joi.string().required()
  }.unknown()
}), authMiddleware, taskController.view);

Route.post('/tasks/:projectid', celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    completion_date: Joi.string(),
    status: Joi.number().integer().required(),
  }),
  [Segments.PARAMS]: Joi.object().keys({
    projectid: Joi.number().integer().required(),
  }),
  [Segments.HEADERS]: {
    authorization: Joi.string().required()
  }.unknown()
}), authMiddleware, taskController.create);

Route.patch('/tasks/:taskid', celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
    completion_date: Joi.string(),
    status: Joi.number().integer(),
  }),
  [Segments.PARAMS]: Joi.object().keys({
    taskid: Joi.number().integer().required(),
  }),
  [Segments.HEADERS]: {
    authorization: Joi.string().required()
  }.unknown()
}), authMiddleware, taskController.patch);

Route.delete('/tasks/:taskid/:projectid', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    projectid: Joi.number().integer().required(),
    tasktid: Joi.number().integer().required(),
  }),
  [Segments.HEADERS]: {
    authorization: Joi.string().required()
  }.unknown()
}), authMiddleware, taskController.delete);


module.exports = Route;
