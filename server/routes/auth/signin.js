var express = require('express');
var router = express.Router();
const passport = require("passport");

router.get('/', function(req, res){
  res.render("signin");
});

router.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/auth/signin'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.send('signin complete');
    });
  })(req, res, next);
});
/*
router.post('/',function(req, res, next ){
  passport.authenticate('local', function(err, user, info) {
console.log(err);
console.log(user);
console.log(info);
    if (err) { return next(err) }
    if (!user) { return res.json( { message: info.message }) }
    res.json(user);
  })(req, res, next);   
});
*/

module.exports = router;
