const fs  = require('fs')

fs.readFile('./goods.json','utf8',function(err,data){

	//读取的可能是字符串,需需转换成对象
    let newData = JSON.parse(data)
    let pushData = []
    let i = 0
	// 遍历对象,把IMAGE1不为空的那条数据push到pushData里
    newData.RECORDS.map(function(value,index){
        if(value.IMAGE1!=null){
            i++
            console.log(value.NAME)
            pushData.push(value)
        } 
    })
    console.log(i)
    //console.log(pushData)
	// 把pushData写入到 ./newsGoods.json文件里
    fs.writeFile('./newGoods.json',JSON.stringify(pushData),function(err){
        if(err) console.log('写文件操作失败')
        else console.log('写文件操作成功')
    })
})