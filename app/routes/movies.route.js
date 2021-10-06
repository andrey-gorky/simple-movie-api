const controller = require('../controllers/movies.controller');
const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const { stringify } = require('querystring');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router
    .post('/create', controller.createOne)
    .delete('/:id', controller.deleteOne)
    .get('/:id', controller.findOne)
    .get('/', controller.findAll)
    .get('/title/:title', controller.findOneByTitle)
    .get('/actor/:actor', controller.findAllByActor)
    .post('/import', upload.single("importedFile"), controller.importFromFile);

module.exports = router;