const controller = require('../controllers/index.controller');
const router = require('express').Router();

router.get('/', controller.healthCheck);

module.exports = router;
