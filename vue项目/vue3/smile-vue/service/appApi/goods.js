const Router = require('koa-router')
let router = new Router()

const mongoose = require('mongoose')
const fs = require('fs')

// 插入本地数据商品详情数据到数据库
// router.get('/insertAllGoodsInfo',async(ctx)=>{
// 	// fs读取本地数据
//     fs.readFile('./data_json/newGoods.json','utf8',(err,data)=>{
// 		// 得到的数据转成对象
//         data=JSON.parse(data)
//         let saveCount=0
// 		// 引入Goods模型
//         const Goods = mongoose.model('Goods')
// 		// 遍历本地数据
//         data.map((value,index)=>{
//             console.log(value)
//             let newGoods = new Goods(value)
// 			// 保存到数据库
//             newGoods.save().then(()=>{
//                 saveCount++
//                 console.log('成功'+saveCount)
//             }).catch(error=>{
//                 console.log(MediaStreamErrorEvent)
//             })
//         })
//     })
//     ctx.body="开始导入数据"
// })

//插入本地数据商品分类数据到数据库
// router.get('/insertAllCategory',async(ctx)=>{
//     fs.readFile('./data_json/category.json','utf8',(err,data)=>{
//         data=JSON.parse(data)
//         let saveCount=0
//         const Category = mongoose.model('Category')
//         data.RECORDS.map((value,index)=>{
//             console.log(value)
//             let newCategory = new Category(value)
//             newCategory.save().then(()=>{
//                 saveCount++
//                 console.log('插入成功:'+saveCount)
//             }).catch(error=>{
//                 console.log('插入失败:'+error)
//             })
//         })

//     })
//     ctx.body="开始导入数据....."
// })

//插入本地数据商品分类子项数据到数据库
// router.get('/insertAllCategorySub',async(ctx)=>{
//     fs.readFile('./data_json/category_sub.json','utf8',(err,data)=>{
//         data=JSON.parse(data)
//         let saveCount=0
//         const CategorySub = mongoose.model('CategorySub')
//         data.RECORDS.map((value,index)=>{
//             console.log(value)
//             let newCategorySub = new CategorySub(value)
//             newCategorySub.save().then(()=>{
//                 saveCount++
//                 console.log('插入成功:'+saveCount)
//             }).catch(error=>{
//                 console.log('插入失败:'+error)
//             })
//         })

//     })
//     ctx.body="开始导入数据....."
// })

//**获取商品详情信息的接口
router.post('/getDetailGoodsInfo',async(ctx)=>{
    try{
        // 前端传过来的商品id
        let goodsId = ctx.request.body.goodsId
        // 引入模型(骨架里暴露出来的)
        const Goods = mongoose.model('Goods')
        console.log(goodsId)
        // 根据商品id从数据库里查找,这里的字段要与骨架里的ID字段一样
        let result= await Goods.findOne({ID:goodsId}).exec()
        console.log(result)
        // 查找成功后返回给前台
        ctx.body={code:200,message:result}
    }catch(error){
        ctx.body={code:500,message:error}
    }
})

//**读取大类数据的接口 */
router.get('/getCategoryList',async(ctx)=>{
    try{
        const Category = mongoose.model('Category')
        let result = await Category.find().exec()
        ctx.body={code:200,message:result}
    }catch(error){
        ctx.body={code:500,message:error}
    }
    
})

/**读取小类的数据 */
router.post('/getCategorySubList',async(ctx)=>{
    try{
        let cateoryId = ctx.request.body.categoryId
        //let cateoryId=1
        const CategorySub = mongoose.model('CategorySub')
        let result = await CategorySub.find({MALL_CATEGORY_ID:cateoryId}).exec()
        ctx.body={code:200,message:result}
    }catch(error){
        ctx.body={code:500,message:error}
    }
    
})

/**根据类别获取商品列表 */

router.post('/getGoodsListByCategorySubID',async(ctx)=>{
    try{
        let categorySubId = ctx.request.body.categorySubId  //前端传过来的子类别ID
        let page = ctx.request.body.page  //前端传过来的当前页数
        let num = 10  //每页显示数量
        let start = (page-1)*num  //开始位置

        const Goods = mongoose.model('Goods')
        // skip(start):跳过多少条数据;limit(num):每页数量
        let result = await Goods.find({SUB_ID:categorySubId})
        .skip(start).limit(num).exec()
        ctx.body={code:200,message:result}
    }catch(error){
        ctx.body={code:500,message:error}
    }
    
})



module.exports = router