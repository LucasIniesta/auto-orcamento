const express = require('express');
const route = express.Router();
const authController = require('./src/controllers/authController');
const proposalController = require('./src/controllers/proposalController')
const { loginRequired } = require('./src/middlewares/middleware');

// Rotas de Autenticação
route.get('/', authController.index);
route.get('/login', authController.login);
route.get('/register', authController.register);
route.post('/register', authController.processRegister)
route.post('/login', authController.processLogin)
route.get('/dashboard', loginRequired, authController.dashBoard)
route.get('/login/logout', authController.logOut)
route.get('/dashboard/logout', authController.logOut)

// Rotas de proposta
route.get('/newProposal', loginRequired, proposalController.newProposal)
route.get('/editProposal', loginRequired, proposalController.editProposal)
route.get('/viewProposal', loginRequired, proposalController.viewProposal)


module.exports = route;
