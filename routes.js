const express = require('express');
const route = express.Router();
const authController = require('./src/controllers/authController');

// Rotas de Autenticação
route.get('/', authController.index);
route.get('/login', authController.login);
route.get('/register', authController.register);
route.post('/register', authController.processRegister)


module.exports = route;
