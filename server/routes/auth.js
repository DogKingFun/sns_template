var express = require('express');
var router = express.Router();

/*
var localRouter = require('./auth/local');
//var googleRouter = require('./auth/google');
router.use('/local', localRouter);
//router.use('/google', googleRouter);
*/

var upRouter = require('./auth/signup');
var inRouter = require('./auth/signin');
var outRouter = require('./auth/signout');

router.use('/signup', upRouter);
router.use('/signin', inRouter);
router.use('/signout', outRouter);

module.exports = router;
