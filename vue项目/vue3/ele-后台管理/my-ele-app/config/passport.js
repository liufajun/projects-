const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require("mongoose");
//models下的User.js里的users                        
const User = mongoose.model("users");
//引入keys.js(需使用里面的secret)
const keys = require("../config/keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;
// opts.secretOrKey = 'secret';
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';

module.exports = passport =>{
    // done:回调函数, jwt_payload: 用户信息
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
         console.log(jwt_payload);
        //  根据用户id查找
        User.findById(jwt_payload.id)
            .then(user => {
              // 如果用户存在,则返回user
              if(user){
                return done(null,user);
              }
              // 不存在则返回false
              return done(null,false);
            })
            .catch(err => console.log(err));
    }));
}