const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();

// 引入users.js
const users = require("./routes/api/users");
// 引入profiles.js
const profiles = require("./routes/api/profiles");

// mongoose数据库配置文件
const db = require('./config/keys').mongooseURL;

// 使用body-parser中间件
app.use(bodyParser.urlencoded( {extended: false} ));
app.use(bodyParser.json());



// 连接mongoose数据库
mongoose
    .connect(
        // 数据库地址,可直接写在这里
        db,
        { useNewUrlParser: true }
    )
    .then( () => console.log('MongoDB Connected') )
    .catch( err => console.log(err) )


//初始化passport
app.use(passport.initialize());
// 引入编写的passport.js配置文件，并传递一个参数passport(就是上面引入的passport)
require("./config/passport")(passport);


// app.get("/",(req,res) =>{
//     res.send("hello world")
// })


/**
 * 1.使用routes,第一个参数是路径(自己定义),第二个参数是上面引入的users.js
 * 2.浏览器输入 http://localhost:5001/api/users/test 就会访问users(users.js)里的内容
*/
app.use("/api/users",users);
app.use("/api/profiles",profiles);

const port = process.env.PORT || 5001;

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})