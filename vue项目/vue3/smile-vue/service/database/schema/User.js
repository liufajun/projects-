const mongoose = require("mongoose")
const Schema = mongoose.Schema
// 获取主键id
let ObjectId = Schema.Types.ObjectId
// 引入加密加盐
const bcrypt = require("bcrypt")
// 定义密码强度
const SALT_WORK_FACTOR = 10



// 创建User的骨架UserSchema
const userSchema = new Schema({
    // UserId: {ObjectId,
    UserId: {type: ObjectId},                               // 用户id
    // unique: true (不能重复)
    userName: {unique: true,type:String},                   // 用户名字
    password: String,                                       // 密码
    createAt: {type: Date,default: Date.now()},             //创建账户时间
    lastLoginAt: {type: Date,default: Date.now()},          //最后一次登录时间
})

// userSchame每次保存时都加密,pre()每次时间
userSchema.pre('save', function(next){
    //  bcrypt.genSalt 加盐
    bcrypt.genSalt(SALT_WORK_FACTOR,(err,salt)=>{
        if(err) return next(err)
        // bcrypt.hash 加密
        bcrypt.hash(this.password,salt,(err,hash)=>{
            if(err) return next(err)
            this.password = hash
            next()
        })
    })
})

/**
 * 通过bscrypt进行前后端代码比对
 *      1.comparePassword: 是自定义的方法
 *          _password: 前端用户注册和登录是输入的密码
 *          password: 数据库里的用户密码
 *          isMatch: 返回的密码对比结果
 * 
 */ 
userSchema.methods = {
    comparePassword: (_password,password) =>{
        return new Promise((resolve,reject)=>{
            // 密码对比
            bcrypt.compare(_password,password,(err,isMatch)=>{
                // 如果不出现错误则返回对比结果
                if(!err){
                    resolve(isMatch)
                }else{
                    reject(err)
                }
            })
        })
    }
}

// 发布模型
mongoose.model("User",userSchema)