// pages/movies/more-movie/more-movie.js
var app = getApp();
var util = require("../../../utils/util");
Page({
  data: {
      navigateTitle:"",
      movies:"",
      requestUrl:"",
      totalCount:"0",
      isEmpty:true,
      totalMovies:""
  },
  onLoad: function (options) {
      //获取点击更多时页面跳转时路径后带的参数category
      var category = options.category;
      console.log(category)
      this.setData({
          navigateTitle:category
      });
      var dataUrl = "";
      //category等于对应的case值则跳转到对应页面,这里不限制电影条数(不限制条数默认获取20条数据)
      //为什么变量名都相同,这三个不能同时出现，页面跳转只能出现一个地址
      switch (category){
            case "正在热映":
                dataUrl = app.globalUrl.doubanBase + "/v2/movie/in_theaters";
                break;
            case "即将上映":
                dataUrl = app.globalUrl.doubanBase + "/v2/movie/coming_soon";
                break;
            case "豆瓣Top250":
                dataUrl = app.globalUrl.doubanBase + "/v2/movie/top250";
                break;
      }
      // 把上面的dataUrl存入公共data中方便其他函数使用
      this.data.requestUrl = dataUrl;
      //调用util.js中封装的http方法,this.processDoubanData是下面定义的方法
      util.http(dataUrl, this.processDoubanData)
      wx.showNavigationBarLoading();
  },
  //下拉刷新
  onPullDownRefresh:function(event){
    var refreshURL = this.data.requestUrl+"?start=0&count=20";
    // 下拉刷新时清空之前的电影数据
    this.data.totalMovies=[];
    this.data.isEmpty = true;
    util.http(refreshURL,this.processDoubanData);
    wx.showNavigationBarLoading();
  },
  // 上拉加载数据(上拉后数据从哪条开始加载20条,就像分页里的下标)
  onReachBottom:function(event){
      var nextUrl = this.data.requestUrl + 
      "?start=" + this.data.totalCount + "&count=20";
      util.http(nextUrl,this.processDoubanData);
      //设置每次上拉时头部会出现加载动画
      wx.showNavigationBarLoading();
  },

    processDoubanData: function (moviesDouban){
      //参数moviesDouban就是不同类型电影的整条对象数据
      console.log(moviesDouban);
      var movies = [];
      // moviesDouban.subjects对象里包含电影名字,评分，演员等信息(要获取指定信息需遍历)
      for (var idx in moviesDouban.subjects) {
          var subject = moviesDouban.subjects[idx];
          //获取电影名
          var title = subject.title;
          //电影名长度超过6则取截前面6个字符和省略号
          if (title.length >= 6) {
              title = title.substring(0, 6) + "...";
          }
          //把获取到的电影信息存放到temp对象中
          var temp = {
              //电影名
              title: title,
              //电影评分
              average: subject.rating.average,
              //大号背景图
              coverageUrl: subject.images.large,
              //电影id
              movieId: subject.id,
              //获取星星评分形式(3星)[1,1,1,0,0]
              stars: util.convertToStarsArray(subject.rating.stars)
          }
          movies.push(temp);
      }
      /**
       * 原因：新加载的20条数据会替换之前的20条数据,会总是显示20条数据
       * concat(aa):数组合并
       * 需判断是否是第一次进入页面,不是第一次进入则累加数据
      */
      var totalMovies = [];
      //如果不是第一次进入
      if(!this.data.isEmpty){
      // 第一个movies是之前的电影数据,concat(movies)就是上面新加载的电影数据
          totalMovies = this.data.movies.concat(movies);
      // 如果是空的，没有电影数据就把加载的新电影数据添加到totalMovies
      }else{
        totalMovies = movies;
        this.data.isEmpty = false;
      }
      this.setData({
        movies:totalMovies
      })
      // 总的数据:下拉一次就加载20条数据下拉几次就加几个20(上面成功后再加载20条数据)
      this.data.totalCount+=20;
      // 加载完数据后再隐藏头部导航条加载动画(否则会一直旋转)
      wx.hideNavigationBarLoading();

  },
  //设置点击更多页面头部导航条wx.setNavigationBarTitle要在页面渲染完成生命周期函数中使用
  onReady: function(event){
    //   var that = this;
      wx.setNavigationBarTitle({
          title: this.data.navigateTitle,
          success: function(res){

          }
      })
  },
  goMovieDetail: function (event) {
    var movieId = event.currentTarget.dataset.movieid;
    //跳转到详情页时也把movieid传过去,然后在详情页接收
    wx.navigateTo({
        url:'../movie-detail/movie-detail?movieId=' + movieId
    })
//    console.log(movieId)
}
  

})