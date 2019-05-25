/**
 * 用户注册和登录
 */

const express = require("express");
const router = express.Router();
// 引入密码加密库
const bcrypt = require("bcryptjs");
//引入jsonwebtoken
const jwt = require("jsonwebtoken");
//引入全球头像
const gravatar = require("gravatar");
const keys = require("../../config/keys");
//引入passport
// const passport = require("passport-jwt");
const passport = require("passport");

//引入User
const User = require("../../models/User");



// 浏览器输入 http://localhost:5001/api/users/test 就会访问users(users.js)里的内容
router.get("/test", (req, res) => {
    res.json({
        msg: "login works"
    })
})


/**
 *  注册
 *  post请求： http://localhost:5001/api/users/register
 *  @desc     返回请求的json数据
 *  @access   public (公共的接口,可以被所有网站访问)
*/
router.post("/register", (req, res) => {
    // 好像是Postman里的Body
    // console.log(req.body)

    /**
     * 查询数据库中是否存在相同邮箱
     * findOne() 查找一个
     */
    User.findOne({
            email: req.body.email
        })
        .then((user) => {
            if (user) {
                //如果存在邮箱则返回400状态码，json数据
                return res.status(400).json("邮箱已被注册")
            } else {
                // 根据在gravatar里注册时填写的邮箱来自动获取设置的头像
                const avatar = gravatar.url(req.body.email,{s:'200',r:'g',d:'mm'})
                // 邮箱不存在则创建邮箱(用户注册时填写的信息)
                const newUser = new User({
                    // 这里的字段就是models/User文件里的实例对象(设置有 required: true属性的一定要在这里赋值即在Postman里的body里创建，否则会报错，切记切记)
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password,
                    identity: req.body.identity
                })

                // 密码加密
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        // 错误则抛出异常
                        if (err) throw err;
                        //正确则把加密后的密码hash赋给password
                        newUser.password = hash;

                        //调用存储方法save(),存储成功则返回user
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    });
                });
               
            }
        })
})


/**
 *  登录
 *  post请求： http://localhost:5001/api/users/login
 *  @desc     返回token jwt passport
 *  @access   public (公共的接口,可以被所有网站访问)
*/
router.post("/login", (req, res) => {
    // 用户输入的邮箱
    const email = req.body.email;
    //用户输入的密码
    const password  = req.body.password;
    //查询数据库
    User.findOne({email})
        .then(user => {
            // 登录时如果数据库中找不到输入的邮箱
            if(!user){
                return res.status(404).json("用户不存在")
            }

            // 查找到邮箱则匹配密码(第一个参数：用户输入的密码，第二个参数：数据库中查找的密码)
            bcrypt.compare(password,user.password)
                .then(isMatch =>{
                    // 密码匹配成功
                    if(isMatch){
                        /**
                         * jwt.sign("规则","加密名字","过期时间3600秒",箭头函数)
                        */
                        //自定义规则(这里就用id和name,都是数据库里的)
                        const rule = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar,
                            identity: user.identity
                        }; 

                        jwt.sign(rule,keys.secretOrKey,{expiresIn:3600},(err,token) => {
                            if(err) throw err;
                            res.json({
                                //获得token
                                success: true, 
                                // 返回的token值是"Bearer "(注意有个空格)加上定义的规则rule
                                token: "Bearer " + token
                            })
                        })
                        // res.json({msg:"success"})
                    }else{
                        return res.status(400).json("密码错误")
                    }

                })
        })
})


/**
 *  用户信息
 *  get请求： http://localhost:5001/api/users/current
 *  @desc     返回用户信息
 *  @access   private
 *  passport验证token成功后才会返回数据
*/
router.get("/current",passport.authenticate("jwt",{session:false}),(req, res) => {
    //返回用户信息,passport.js里返回的user
    //res.json(res.user)

    //返回需要的用户信息()
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        identity: req.user.identity
    })

})


module.exports = router;
