const controller = require('../controllers/users.controller');
const router = require('express').Router();

router
    .post('/create', controller.createOne)
    .post('/login', controller.login);

module.exports = router