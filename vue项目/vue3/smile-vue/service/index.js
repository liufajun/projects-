const Koa = require("koa")
const app = new Koa()
// 引入init.js里暴露出来的对象
const { connect,initSchemas } = require('./database/init.js')
const mongoose = require("mongoose")
const bodyParser = require("koa-bodyparser")
const cors = require("koa2-cors")
const Router = require("koa-router")

app.use(cors())	
app.use(bodyParser())

// 引入路由模块
let user = require("./appApi/user")
let home = require("./appApi/home")
let goods = require('./appApi/goods')

//装载所有子路由
let router = new Router()
// localhost:3000/user/register
router.use('/user',user.routes())
// localhost:3000/home
router.use('/home',home.routes())
//执行后端目录下node index.js命令,然后在浏览器里输入localhost:3000/goods/insertAllGoodsInfo就可以往数据库插入数据
router.use('/goods',goods.routes())
//egg.js

//加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())




// 立即执行函数(连接数据库)
;(async ()=>{
    await connect()
    initSchemas ()
})()

app.use(async(ctx) => {
    ctx.body = '<h1>Hello koa2</h1>'
})
// 端口号,本地为localhost:3000
app.listen(3000,()=>{
    console.log("serve staring at port 3000")
})