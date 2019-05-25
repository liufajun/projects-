/**
 * 
 */

const express = require("express");
const router = express.Router();
//引入passport
const passport = require("passport");

//引入User.js
const User = require("../../models/User");
//引入Profiles.js
const Profile = require("../../models/Profile");


// 浏览器输入 http://localhost:9310/api/profiles/test 就会访问users(users.js)里的内容
router.get("/test", (req, res) => {
    res.json({
        msg: "profile works"
    })
})


/**
 * @route post   http://localhost:9310/api/profiles/add
 * @description     创建信息接口(弹出的填写信息框)
 * @access private
*/
router.post("/add",passport.authenticate('jwt',{session: false}),(req,res) => {
    const profileFields = {};
    // 如果有户输入类型则把获取它
    if(req.body.type) profileFields.type = req.body.type;
    if (req.body.describe) profileFields.describe = req.body.describe;
    if (req.body.income) profileFields.income = req.body.income;
    if (req.body.expend) profileFields.expend = req.body.expend;
    if (req.body.cash) profileFields.cash = req.body.cash;
    if (req.body.remark) profileFields.remark = req.body.remark;

    //数据库存储成功后则返回它
    new Profile(profileFields).save().then( profile => {
        res.json(profile);
    } )

} )


/**
 * @route get   http://localhost:9310/api/profiles
 * @description     获取所有信息
 * @access private
*/
router.get("/",passport.authenticate('jwt',{session: false}),(req,res) => {
    Profile.find()
        .then(profile => {
            if (!profile) {
                return res.status(404).json("没有任何内容")
            }
            res.json(profile)
        })
        .catch(err => res.status(404).json(err));
} );


/**
 * @route get    http://localhost:9310/api/profiles/:id
 * @description     获取单个信息
 * @access private
*/
router.get("/:id",passport.authenticate('jwt',{session: false}),(req,res) => {
    // 前端传过来的id
    Profile.findOne({ _id: req.params.id })
        .then(profile => {
            if (!profile) {
                return res.status(404).json("没有任何内容")
            }
            res.json(profile)
        })
        .catch(err => res.status(404).json(err));
} );


/**
 * @route post    http://localhost:9310/api/profiles/edit/:id
 * @description     编辑信息接口
 * @access private
*/
router.post("/edit/:id",passport.authenticate('jwt',{session: false}),(req,res) => {
    const profileFields = {};
    // 如果有户输入类型则把获取它
    if(req.body.type) profileFields.type = req.body.type;
    if (req.body.describe) profileFields.describe = req.body.describe;
    if (req.body.income) profileFields.income = req.body.income;
    if (req.body.expend) profileFields.expend = req.body.expend;
    if (req.body.cash) profileFields.cash = req.body.cash;
    if (req.body.remark) profileFields.remark = req.body.remark;

    Profile.findOneAndUpdate(
        { _id: req.params.id },
        { $set: profileFields },
        { new: true }
    ).then(profile => res.json(profile))

} );


/**
 * @route delete    http://localhost:9310/api/profiles/delete/:id
 * @description     删除信息接口
 * @access private
*/
router.delete(
    '/delete/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      Profile.findOneAndRemove({ _id: req.params.id })
        .then(profile => {
            //删除之后还需保存
          profile.save().then(profile => res.json(profile));
        })
        .catch(err => res.status(404).json('删除失败!'));
    }
  );

module.exports = router;
