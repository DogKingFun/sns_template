// リクエストがあったとき、ログイン済みかどうか確認する関数
module.exports = function(req, res, next){
    if(req.isAuthenticated())
        return next();  // ログイン済み
    // ログインしてなかったらログイン画面に飛ばす
    res.redirect("/login");
};

/*
//example
router.get("/member_only", isLogined, function(req, res){
    res.render("member_only", {user: req.user});
});
*/

/*

//代替案
router.get('/', function (req, res, next) {
  const userId = req.session.userid;
  const isAuth = Boolean(userId);
  res.render("signin", {
    title: "Sign in",
    isAuth: isAuth,
  });
});

*/