var express = require('express');
var router = express.Router();
const mongo = require('../mongo.js');
const col = mongo.col('chat');

/* GET home page. */
router.get('/', async function(req, res, next) {
  let result = await col.find().toArray();
  res.render('test',{result:result});
});

module.exports = router;
