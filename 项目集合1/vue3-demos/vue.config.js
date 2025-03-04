const goods = require("./data/goods.json");
const ratings = require("./data/ratings.json");
const seller = require("./data/seller.json");
module.exports = {
    // 基本路径
    baseUrl: '/',
    // 输出文件目录
    outputDir: 'dist',
    // 用于嵌套生成的静态资产（js，css，img，fonts）的目录。
    assetsDir: 'assets',
    // 以多页模式构建应用程序。
    pages: undefined,
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    // 是否使用包含运行时编译器的Vue核心的构建。
    runtimeCompiler: false,
    // 默认情况下babel-loader忽略其中的所有文件node_modules。
    transpileDependencies: [],
    // 生产环境sourceMap
    productionSourceMap: true,
    // webpack配置
    configureWebpack: () => {},
    chainWebpack: () => {},
    // css相关配置
    css: {
     // 启用 CSS modules
     modules: false,
     // 是否使用css分离插件
     extract: true,
     // 开启 CSS source maps?
     sourceMap: false,
     // css预设器配置项
     loaderOptions: {},
    },
    // webpack-dev-server 相关配置
    devServer: {
        //自动打开浏览器
        open: true,
        host: 'localhost',
        port: 8080,
        https: false,
        hotOnly: false,
        // 设置代理
        proxy: {
            '/api': {
                target: 'http://192.168.3.215:888',
                ws: true,
                changeOrigin: true,
                //访问地址时可用/api代替target的url值
                pathRewrite: {
                    '^/api': ''
                }
            }
        }, 
        before(app){
            //地址栏路径是这样( http://localhost:8080/api/goods )
            app.get("/api/goods",(req,res) => {
                res.json(goods);
            });
            app.get("/api/ratings",(req,res) => {
                res.json(ratings);
            });
            app.get("/api/seller",(req,res) => {
                res.json(seller);
            })
        }
    },
    // enabled by default if the machine has more than 1 cores
    parallel: require('os').cpus().length > 1,
    // PWA 插件相关配置
    pwa: {},
    // 第三方插件配置
    pluginOptions: {
     // ...
    }
}
