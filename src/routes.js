const express = require('express');

const userController = require('./app/controllers/userController');
const loginController = require('./app/controllers/loginController');
const projectController = require('./app/controllers/projectController');
const taskController = require('./app/controllers/taskController');
const authMiddleware = require('./app/middlewares/auth');

const Route = express.Router();

Route.get('/', (req, res) => {return res.status(200).json({ ok: true })});

Route.post('/register', userController.create);

Route.post('/login', loginController.login);

Route.post('/forgotpassword', userController.forgotPassword);
Route.post('/resetpassword', userController.resetPassword);

Route.get('/projects', authMiddleware, projectController.view);
Route.post('/projects', authMiddleware, projectController.create);
Route.patch('/projects/:projectid', authMiddleware, projectController.patch);
Route.delete('/projects/:projectid', authMiddleware, projectController.dalete);

Route.get('/tasks/:projectid', authMiddleware, taskController.view);
Route.post('/tasks/:projectid', authMiddleware, taskController.create);
Route.patch('/tasks/:taskid', authMiddleware, taskController.patch);
Route.delete('/tasks/:taskid/:projectid', authMiddleware, taskController.delete);


module.exports = Route;
