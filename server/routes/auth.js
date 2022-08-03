var express = require('express');
var router = express.Router();

var googleRouter = require('./auth/google');

router.use('/google', googleRouter);

module.exports = router;
