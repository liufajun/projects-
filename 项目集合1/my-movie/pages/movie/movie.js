var app = getApp();
var util = require('../../utils/util');
Page({
    data: {
        inTheaters:{},
        comingSoon:{},
        top250:{},
        containerShow:true,
        searchPanelShow:false,
        texts:""
    },
    onLoad: function (options) {
        //获取app.js中的变量豆瓣地址
        var doubanUrl = app.globalUrl.doubanBase;
        // 正在热映("?start=0&count=3:只获取3电影条数据)
        let inTheatersUrl = doubanUrl + "/v2/movie/in_theaters" + "?start=0&count=6";
        //即将上映
        let comingSoonUrl = doubanUrl + "/v2/movie/coming_soon" + "?start=0&count=6";
        //Top250
        let top250Url = doubanUrl + "/v2/movie/top250" + "?start=0&count=6";
        //调用方法
        this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映");
        this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
        this.getMovieListData(top250Url, "top250","豆瓣Top250" );
        
    },
    // 点击更多则跳转到相应页面
    onMoreTap: function(event){
        // currentTarget指鼠标当前点击的组件(view元素),dataset指的是一个或多个data- 自定义属性的集合或对象。category是movie-list-template.wxml中的data-category中的category
        //路径带的参数会一起跳转到相应的页面
        var category = event.currentTarget.dataset.categoryname;
        wx.navigateTo({
            url:"movie-more/movie-more?category=" + category
        })
    },
    // 跳转到电影详情页(这个方法是绑定在movie-template.wxml里的,movieid也是这里传过来的))
    goMovieDetail: function (event) {
        var movieId = event.currentTarget.dataset.movieid;
        //跳转到详情页时也把movieid传过去,然后在详情页接收
        wx.navigateTo({
            url:'movie-detail/movie-detail?movieId=' + movieId
        })
    //    console.log(movieId)
    },
    //搜索框获取焦点，电影列表消失
    onBindFocus: function(event){
        this.setData({
            containerShow:false,
            searchPanelShow:true
        })
    },
    //搜索框失去焦点，显示搜索结果
    onBindBlur: function(event){
        this.setData({
            containerShow:true,
            searchPanelShow:false
        })
        //获取搜索输入框的文本(event.detail.value是豆瓣提供的，路径格式也是豆瓣提供的)
        var text = event.detail.value;
       
        var searchUrl = app.globalUrl.doubanBase + "/v2/movie/search?q=" + text;
        //this.getMovieListData(searchUrl,settedKey, categoryTitle);
    },
    onCancelTap: function(event){
        event.detail.value="";
    },
    getMovieListData: function (url, settedKey, categoryTitle){
        var that = this;
        wx.request({
            url: url, 
            method: 'GET',
            header: {
                //设置为application/xml会出错
                'content-type': 'application/xml'
            },
            success: function (res) {
                //console.log(res.data)
                //获取服务端返回的数据(回调函数:下面定义的方法)   
                that.processDoubanData(res.data, settedKey,categoryTitle)
            },
            fail: function () {

            }
        })
    },
    processDoubanData: function(moviesDouban,settedKey,categoryTitle){
        var movies = [];
        // moviesDouban.subjects对象里包含电影名字,评分，演员等信息(要获取指定信息需遍历)
        for(var idx in moviesDouban.subjects){
            var subject = moviesDouban.subjects[idx];
            //获取电影名
            var title = subject.title;
            //电影名长度超过6则取截前面6个字符和省略号
            if(title.length >= 6){
                title = title.substring(0,6) + "...";
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
                    //获取星星评分数字(3星)[1,1,1,0,0]
                    stars: util.convertToStarsArray(subject.rating.stars)
            }
            movies.push(temp);
        }
        //把获取到的电影信息存入data对象中
        // this.setData({
        //     movies: movies
        // })
        var readyData = {};
        //通过settedKey来区分是正在上映，不久上映,top250中谁的数据
        readyData[settedKey] = {
            movies:movies,
            categoryTitle: categoryTitle
        };
        this.setData(readyData)
        //console.log(readyData)
    }
  
})