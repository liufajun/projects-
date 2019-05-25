
function convertToStarsArray(stars){
    // 截取评分中的第一个数字，例如6.2中的6，7.0中的7
    var num = stars.toString().substring(0,1);
    var array = [];
    //5颗星遍历5次, 评分星星形式(1表示满星，0表示灰色星星)： [1,1,1,0,0]
    for(var i=1; i<=5; i++){
        //截取的数字大于或等于i则把1存入数组中
        if(i<=num){
            array.push(1);
        }else{
            //截取的数字小于i则把0存入数组中
            array.push(0);
        }
    }
    return array;
}
// 主演有多个需遍历,还要把主演拼接在一起并用斜杠/分隔开
function convertToCast(casts) {
    var castsjoin = "";
    var castsfinal = "";
    for ( var dic in casts ){
        castsjoin = castsjoin + casts[dic].name + " / ";
    }
    // 不要最后一个主演的后面也带斜杠，不截取最后一个斜杠
    castsfinal = castsjoin.substring(0,castsjoin.length-3);
    //console.log(castsfinal)
    return castsfinal;
}
//处理演员信息: 头像 + 名字
function convertToCastInfos(casts) {
    var castsArray = []
    for (var idx in casts) {
      var cast = {
        //   判断主演头像是否存在,不存在则为""
        img: casts[idx].avatars ? casts[idx].avatars.large : "",
        name: casts[idx].name
      }
      castsArray.push(cast);
    }
    return castsArray;
}
// 详情页头部导航条电影名过长，需截取一定长度
function cutText(text,start,end) {
    if(text.length > end){
        text = text.substring(start,end) + "..."
    }
    return text;
}
// 公共的网络请求
function http(url,callBack) {
    wx.request({
        url: url,
        method: 'GET',
        header: {
            //设置为application/xml会出错
            'content-type': 'application/xml'
        },
        success: function (res) {
            callBack(res.data);
        },
        fail: function(error){

        }
    })
}

module.exports = {
    convertToStarsArray:convertToStarsArray,
    convertToCast:convertToCast,
    convertToCastInfos:convertToCastInfos,
    cutText:cutText,
    http:http
}
