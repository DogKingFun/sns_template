var express = require('express');
var router = express.Router();

var isSigned = require('./isSigned');

/* GET users listing. */
router.get('/', isSigned,function(req, res, next) {
console.log(req.session);
  res.send('respond with Hanako');
});

module.exports = router;