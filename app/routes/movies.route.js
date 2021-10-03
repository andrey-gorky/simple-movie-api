const controller = require('../controllers/movies.controller');
const router = require('express').Router();

router
    .post('/create', controller.createOne)
    .delete('/:id', controller.deleteOne)
    .get('/:id', controller.findOne)
    .get('/', controller.findAll)
    .get('/title/:title', controller.findOneByTitle)
    .get('/actor/:actor', controller.findAllByActor);
    // .post('/:file', controller.importByFile);

module.exports = router;