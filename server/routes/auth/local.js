var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.render("local");
});

router.get('/signin',function(req, res){
  
});

router.post(passport.authenticate('local', 
  { successRedirect: '/',
    failureRedirect: '/auth/local',
    failureFlash: true 
}));

module.exports = router;
