var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
const mongo = require('../../mongo.js');

const rounds = 8;

const col = mongo.col('user');

router.get('/', function(req, res){
  res.render("signup");
});

router.post('/', async function(req, res){
console.log(req.body);
  let username = req.body.username;
  let password = req.body.password;
  if(!username && !password){
    res.send('input is empty');
    return;
  }
  let one = await col.findOne({_id:username});
  if(one){
    res.send('error : username is already in use');
    return;
  }
  let hash = await bcrypt.hash(password, rounds);
  let query = { _id:username, password:hash }
  col.insertOne(query);
  res.send('successfull');
  // user登録が完了
});


module.exports = router;
