var express = require('express');
var router = express.Router();
const passport = require("passport");

router.get('/', function(req, res){
  res.render("signin");
});

router.post('/', 
  passport.authenticate('local', { failureRedirect: '/signin' }),
  function(req, res) {
    res.redirect('/');
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
