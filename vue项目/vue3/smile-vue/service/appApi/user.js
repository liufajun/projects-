const Router = require("koa-router")
const mongoose = require("mongoose")

let router = new Router()

router.get('/', async (ctx) => {
    ctx.body = "这是用户操作首页"
})
// 注册接口
router.post("/register", async (ctx) => {
    // User模型就是User.js暴露出来的模型
    const User = mongoose.model("User")
    // 接收前台传过来的数据 ctx.request.body
    let newUser = new User(ctx.request.body)

    //数据保存到数据库
    await newUser.save().then(() => {
        //成功保存到数据库则返回对象给前台
        ctx.body = {
            code: 200,
            message: "注册成功"
        }
    }).catch(error => {
        ctx.body = {
            code: 500,   //服务器异常
            message: error
        }
    })
})
// 登录接口
router.post("/login", async (ctx) => {
    // 获取用户登录时传过来的用户名和密码
    let loginUser = ctx.request.body
    // console.log(loginUser)
    let userName = loginUser.userName
    let password = loginUser.password

    // 引入User里的model
    const User = mongoose.model("User")


    /*
        前后台用户信息验证:

            根据前端台传过来的用户名去数据库查找,查找成功则继续根据前台传过来的密码进行
    */
    // 根据前端传过来的用户名进行查找
    await User.findOne({ userName: userName }).exec().then(async (result) => {
        console.log(result)
        // 如果查找成功
        if (result) {
            // 创建一个实例，就可以调用这个实例里的方法
            let newUser = new User()
            // comparePassword就是database > schema > User.js里的方法,根据前后台的用户密码匹配,isMatch是匹配结果
            await newUser.comparePassword(password, result.password).then(isMatch => { 
                ctx.body={code:200,message: isMatch}
            }).catch(error=>{
                ctx.body={code:500,message:error}
            })

        } else {
            ctx.body = { code: 200, message: "用户名不存在" ,noUserName: true}
        }
    }).catch(error => {
        console.log(error)
        // 返回给前端
        ctx.body = { code: 500, message: error }
    })

})

module.exports = router