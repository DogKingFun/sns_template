var express = require('express');
var router = express.Router();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

//Googleログイン認証
passport.use(new GoogleStrategy({
    clientID: 'クライアントIDを入力',
    clientSecret: 'クライアントシークレットを入力',
    callbackURL: '/auth/google/callback'
  },function (accessToken, refreshToken, profile, done) {
    if (profile) {
      return done(null, profile);
    }else {
      return done(null, false);
    }
  }
));


//Googleログイン認証（スコープ設定）へ
app.get('/', passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
  ]
}));


//Googleログインコールバック
app.get('/callback',
  passport.authenticate('google',{
    failureRedirect: '/login', // 失敗したときの遷移先
  }),
  function (req, res) {
    //emailの値を表示
    console.log(req.user.emails[0].value);
  }
);

module.exports = router;
