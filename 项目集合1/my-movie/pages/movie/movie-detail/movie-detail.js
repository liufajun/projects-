// pages/movie/movie-detail/movie-detail.js
 /**
       * 提取电影信息：
       *    1.电影图片: movieImg
       *    2.制片国家/地区: country
       *    3.电影名称：title
       *    4.繁体名字：original_title
       *    5.想看人数：wish_count
       *    6.短评数量: commentCount
       *    7.年代：year
       *    8.电影类型：generes
       *    9.评星：stars
       *    10.评分:score
       *    11.导演:director
       *    12.主演:casts
       *    13.主演信息: castsInfo
       *    14.简介:summary
      */
var app = getApp();
var utils = require("../../../utils/util");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {},
    navigateTitle:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
      console.log(options.movieId)
      var movieId = options.movieId;
      // 获取详情页电影数据的路径
      var detailMovieUrl = app.globalUrl.doubanBase + "/v2/movie/subject/" + movieId;
      wx.showNavigationBarLoading();
      wx.request({
          url: detailMovieUrl,
          method: 'GET',
          header: {
              //设置为application/xml会出错
              'content-type': 'application/xml'
          },
          success: function (res) {
                var data = res.data;
                //console.log(data)
                  //console.log(res.data);
                //判断电影信息是否存在,
                if(!data){
                  return;
                }
               //处理一下导演(有些电影导演不止一个，这里就只获取一个导演)
              var director = {
                avatar:"",
                name:"",
                id:""
              }
              //如果导演不为空
              if(data.directors[0] != null){
                //如果导演头像不为空
                if(data.directors[0].avatar != null){
                    director.avatar = data.directors[0].avatar.large;
                }
                director.name = data.directors[0].name;
                director.id = data.directors[0].id;
              }
              //提取需要的数据,data.后面的是远程数据里的字段
              var temp = {
                movieImg:  data.images.large,
                //制片国家是个数组
                country: data.countries[0],
                title: data.title,
                originalTitle: data.original_title,
                wishCount: data.wish_count,
                commentCount: data.comments_count,
                year: data.year,
                generes: data.genres,
                director: director,
                casts: utils.convertToCast(data.casts),
                stars:utils.convertToStarsArray(data.rating.stars),
                score: data.rating.average,
                castsInfo:utils.convertToCastInfos(data.casts),
                playTime: data.durations,
                pubdates: data.pubdates,
                summary: data.summary
          
               }
               that.setData({
                  movie: temp,
                  navigateTitle: temp.title
               
              })
             
                //console.log(that.data)
                console.log(that.data.navigateTitle)
              //头部导航标题要在这里设置(拿到数据才能设置),在onReady生命周期函数里拿不到数据,并限制电影名长度
              wx.setNavigationBarTitle({
                  //title: that.data.movie.title
                  title: utils.cutText(that.data.movie.title,0 ,6)
                
              })
              wx.hideNavigationBarLoading();
          },
          fail: function(error){

          }
      })
      console.log(this.data)
      //console.log(this.data.navigateTitle)

     // utils.http(detailMovieUrl,this.callback);
    
     
  },

  onReady: function (event) {
    // wx.setNavigationBarTitle({
    //     title: that.data.movie.title
      
    // })
  }

  
})