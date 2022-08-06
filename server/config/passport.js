const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const cookieSession = require("cookie-session");
const mongo = require('../mongo.js');
const secret = "secretCuisine123";

const db = mongo.db();
const col = mongo.col(db,'user');

module.exports = function (app) {
  passport.serializeUser(async function (user, done) {
console.log('serializeUser');
    done(null, user._id);
  });

  passport.deserializeUser(async function (id, done) {
console.log('deserializeUser');
    try {
      let query = { _id:id };
      let options = {
        projection:{ _id:1 ,}
      }
      const user = await col.findOne(query,options);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  passport.use(new LocalStrategy({
      usernameField: "username",
      passwordField: "password",
    }, async function (username, password, done) {
      let query = { _id:username };
      let options = {
        projection:{ _id:1 , password:1 ,}
      }
      try{
        let user = await col.findOne(query,options);
        if(!user){
  	  return done(null,false);
        }else if(await bcrypt.compare(password,user.password)){
          console.log('successful');
	  return done(null,user);
        }else{
 	  return done(null, false);
        }
      }catch(err){
        console.error(err);
        return done(err);
      }
    }
  ));

  app.use(
    cookieSession({
      name: "session",
      keys: [secret],

      // Cookie Options
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    })
  );

  app.use(passport.session());
};