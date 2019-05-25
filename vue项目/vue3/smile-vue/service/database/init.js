const mongoose = require('mongoose')
// 如果没有smileVue数据库则会自动创建
const db = "mongodb://localhost/smileVue"
const glob = require("glob")
// 将相对路径转化成绝对路径
const { resolve } = require('path')

exports.initSchemas = () => {
    // 把当前目录下的scheme文件夹下的所有js文件引过来(同步的)
    glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
}

exports.connect = () => {
    //连接数据库
    mongoose.connect(db)
    let maxConnectTimes = 0    //最大连接次数
    return new Promise((resolve, reject) => {
        //数据库断开
        mongoose.connection.on('disconnected', () => {
            console.log('***********数据库断开***********')
            // 设置连接次数,不能让数据库一直连接
            if (maxConnectTimes <= 3) {
                maxConnectTimes++
                mongoose.connect(db)
            } else {
                reject()
                throw new Error('数据库出现问题，程序无法搞定，请人为修理.....')
            }
        })
        // 数据库连接失败
        mongoose.connection.on('error', (err) => {
            console.log('***********数据库错误')
            if (maxConnectTimes <= 3) {
                maxConnectTimes++
                mongoose.connect(db)
            } else {
                reject(err)
                throw new Error('数据库出现问题，程序无法搞定，请人为修理.....')
            }
        })
        //链接打开的时
        mongoose.connection.once('open', () => {
            console.log('MongoDB connected successfully')

            resolve()
        })
    })
}