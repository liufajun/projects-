var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');	//引入mongoose模块

//1.连接数据库
mongoose.connect("mongodb://localhost:27017/singer",err => {
	if(err){
		//如果有异常则抛出错误
		throw err;
	}else{
		console.log("数据库连接成功")
	}
});

//2.定义骨架
let singerSchema = new mongoose.Schema({
	title: String,
	author: String,
	from: String,
	content: String,
	time: String,
	hits: Number
})

//3.创建模型model(读取数据)
/**
 * 参数1: 模型名，参数2：定义的骨架对象，参数3：数据库集合名
 * 注意：模型名尽量与数据库集合名相同，否则容易出错
*/ 
let singerModel = mongoose.model('singer',singerSchema,'singer')

//创建实例(根据模型创建)

// 点击表单提交按钮提交发布内容
router.post('/save_add.html',function(req,res){
	let title = req.body.title;
	let	author = req.body.author;
	let	from = req.body.from;
	let	content = req.body.content;
	console.log(title,author,from,content)
	console.log("122")
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  
  //利用模型获取数据
  singerModel.find({},function(err,data){
	  res.send(data);
  })
  
});

/**
 * 新增数据:
 * 		第一个参数: 路由名(自定义)
*/ 
router.get('/add.html', function(req, res) {
  //创建实例
  let list = new singerModel();
  list.name = "赵云";
  list.age = 24;
  list.country = "中国古代三国";
  list.save(function(){
  	res.send('<h2>数据添加成功</h2>')
  });
  
});

/**
 * 删除数据(需根据id删除数据):
 * 		第一个参数: 路由名(自定义)
 * 		浏览器输入: localhost/del.html?id=5cb6ef5b728393079c92a1a4
*/ 
router.get('/del.html',function(req,res){
	//接收get方式传的id值
	let id = req.query.id;
	// 通过id查找数据
	singerModel.findById(id).exec(function(err,data){
		data.remove(function(err){
			res.send('<h2>' + id + '删除成功</h2>')
		})
	})
});

/**
 * 修改数据(需根据id删除数据):
 * 		第一个参数: 路由名(自定义)
 * 		浏览器输入: localhost/modify.html?id="5cb5b49d46292cafd89ae194
*/ 
router.get('/modify.html',function(req,res){
	//接收get方式传的id值
	let id = req.query.id;
	// 通过id查找数据
	singerModel.findById(id).exec(function(err,data){
		data.name = "司马懿";
		data.country = "china";
		data.save(function(err){
			res.send('<h2>' + id + '修改成功</h2>')
		})
	})
})

// db.singer.insert({"name":"曹操","age":53,"country":"中国"}),
module.exports = router;
