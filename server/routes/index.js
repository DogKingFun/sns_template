var express = require('express');
var mongo = require('../mongo.js');
var ObjectId = require('mongodb').ObjectID;
var router = express.Router();

var db = mongo.db();
var col = mongo.col(db,'test-collection');
var id = new ObjectId();
col.insertOne({_id:id,n:0});

/* GET home page. */
router.get('/', async function(req, res, next) {
  col.updateOne({_id:id},{$inc:{n:1}});
  result = await col.findOne();
  console.log(result);
  res.render('index', { title: 'Express' +result['n'] });
});

module.exports = router;
