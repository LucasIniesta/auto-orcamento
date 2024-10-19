const express = require('express');
const route = express.Router();
const authController = require('./src/controllers/authController');
const dashBoardController = require('./src/controllers/dashBoardController')
const { loginRequired } = require('./src/middlewares/middleware');

// Aplicar middleware na rota do dashboard
route.get('/dashboard', loginRequired, dashBoardController.index);


// Rotas de Autenticação
route.get('/', authController.index);
route.get('/login', authController.login);
route.get('/register', authController.register);
route.post('/register', authController.processRegister)
route.post('/login', authController.processLogin)
route.get('/login/logout', authController.logOut)

// Rotas dashboard
route.get('/dashboard', loginRequired, dashBoardController.index)
route.get('/dashboard/logOut', loginRequired, dashBoardController.logOut)


module.exports = route;
