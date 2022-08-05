var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
const mongo = require('../../mongo.js');

const rounds = 8;

const db = mongo.db();
const col = mongo.col(db,'user');

router.get('/', function(req, res){
  res.render("signup");
});

router.post('/', async function(req, res){
  let username = req.body.username;
  let password = req.body.password;
  let one = await col.findOne({_id:username});
  if(one){
    res.send('error : username is already in use');
  }else{
    let hash = await bcrypt.hash(password, rounds);
    let query = { _id:username, password:hash }
    col.insertOne(query);
    // user登録が完了
  }
});


module.exports = router;
