const express = require('express');

const exampleController = require('../controllers/example');

const router = express.Router();

router.get('/', exampleController.exampleGet);

router.get('/error', exampleController.exampleGetError);

module.exports = router;