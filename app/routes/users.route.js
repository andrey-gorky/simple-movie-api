const controller = require('../controllers/users.controller');
const router = require('express').Router();

router
    .post('/users/create', controller.createOne)
    .post('/users/login', controller.login);

module.exports = router