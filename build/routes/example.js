"use strict";
var express = require('express');
var exampleController = require('../controllers/example');
var router = express.Router();
router.get('/', exampleController.exampleGet);
router.get('/error', exampleController.exampleGetError);
module.exports = router;
