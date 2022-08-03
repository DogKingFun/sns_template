// /server/routes/auth/local.js
/*
参考文献
passportを使ったテスト　https://gist.github.com/kikuchy/5912004
【Passport.js】シリアライザーの挙動を調べる https://zenn.dev/kazuma_soon/articles/d53dbca880a709
Body-ParserがExpressにexpress.json()として標準搭載されている話 https://qiita.com/atlansien/items/c587a0bf2f7f9022107c
*/
 
var express = require('express')
  , router = express.Router();

// ハッシュ値を求めるために必要なもの
var crypto = require("crypto");
var secretKey = "some_random_secret";   // シークレットは適当に変えてください
var getHash = function(target){
        var sha = crypto.createHmac("sha256", secretKey);
            sha.update(target);
                return sha.digest("hex");
};

// passportで必要なもの
var flash = require("connect-flash")
  , passport = require("passport")
  , LocalStrategy = require("passport-local").Strategy;

// MongoDBを使うのに必要なもの
var MongoClient = require('mongodb').MongoClient;

const URL = 'mongodb://username:password@mongo/test?authSource=admin';
const client = new MongoClient(URL);
client.connect().then(function(){
  console.log('Succesfully connected to mongo');
}).catch(function(e){
  console.error(e);
});
/*
(async() => {
  try {
    await client.connect();
    console.log('Succesfully connected to mongo');
  } catch (e) {
    console.error(e);
  }
})();
*/
const db = client.db();
const col = db.collection('users');

// passportでのセッション設定
// serializeUserはセッションにユーザー情報を格納するメソッド
passport.serializeUser(function(user, done){
    done(null, {_id: user._id});
});
// deserializeUserはセッションからユーザー情報を取得するメソッド
passport.deserializeUser(function(serializedUser, done){
  col.findOne()
  /*
    User.findById(serializedUser._id, function(err, user){ //変更点
        done(err, user);
    });
  */
});


// LOcalStrategyを使う設定
passport.use(new LocalStrategy(
  // フォームの名前をオプションとして渡す。
  // 今回はusernameの代わりにemailを使っているので、指定が必要
  {usernameField: "email", passwordField: "password"},
  function(email, password, done){
    // 非同期で処理させるといいらしいです
    process.nextTick(function(){
        User.findOne({email: email}, function(err, user){ //変更点
            if(err)
                return done(err);
            if(!user)
                return done(null, false, {message: "ユーザーが見つかりませんでした。"});
            var hashedPassword = getHash(password);
            if(user.password !== hashedPassword)
                return done(null, false, {message: "パスワードが間違っています。"});
            return done(null, user);
        });
    });
}));

/* app.jsに書くやつ
var path = require('path');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret: "another_random_sevret_again"}));  // こちらにも別のシークレットが必要です

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
*/

// router を使う前にpassportの設定が必要です
router.use(flash());
router.use(passport.initialize());
router.use(passport.session());

router.get("/login", function(req, res){
    res.render("login", {user: req.user, message: req.flash("error")});
});
router.post("/login", 
    passport.authenticate("local", {failureRedirect: '/login', failureFlash: true}),
    function(req, res){
        // ログインに成功したらトップへリダイレクト
        res.redirect("/");
    }
);
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

/*　別のルートに入れるメソッド

// リクエストがあったとき、ログイン済みかどうか確認する関数
var isLogined = function(req, res, next){
    if(req.isAuthenticated())
        return next();  // ログイン済み
    // ログインしてなかったらログイン画面に飛ばす
    res.redirect("/login");
};

router.get("/member_only", isLogined, function(req, res){
    res.render("member_only", {user: req.user});
});
*/

module.exports = router;
