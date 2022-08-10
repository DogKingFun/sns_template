var express = require('express');
var router = express.Router();

var upRouter = require('./auth/signup');
var inRouter = require('./auth/signin');
var outRouter = require('./auth/signout');

router.use('/signup', upRouter);
router.use('/signin', inRouter);
router.use('/signout', outRouter);

module.exports = router;
