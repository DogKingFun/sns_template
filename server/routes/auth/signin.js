var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.render("signin");
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/signin',
    failureFlash: true,
  }
));


module.exports = router;
