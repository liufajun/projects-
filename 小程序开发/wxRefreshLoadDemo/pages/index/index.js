
//index.js
//获取应用实例
const app = getApp();
const parentUrl = "http://apicloud.mob.com/v1/cook/menu/search?name=%E7%BA%A2%E7%83%A7%E8%82%89&cid=0010001007&key=17113fceca309&size=20&page=";
var curPage = 0;
var ctgTitles;
var thumbnail;
var isRefresh = true;
Page({
  data: {
    refresh_h: false,//刷新
    load_h: true,//加载
    line_h: true,//底线
    scrollTop: 0,
  },

  onLoad: function () {
    //微信的scroll-view必须要设置高度才能监听滚动事件，所以，需要在页面的onLoad事件中给scroll-view的高度赋值
    var that = this;
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    })
    //设置第一次数据
    GetList(that);
  },

  //页面滑动到顶部(下拉刷新)
  topLoad: function (e) {
    isRefresh = true;
    curPage = 0;
    var that = this;
    that.setData({
      list: [],
      scrollTop: 0
    })
    GetList(that)
  },
  //页面滑动到底部(上拉加载)
  downLoad: function (e) {
    var that = this;
    isRefresh = false;
    GetList(that)
  },
  //设置竖向滚动条位置
  scroll: function (event) {
    this.setData({
      scrollTop: event.detail.scrollTop
    });
    console.log(event.detail.scrollTop);
  },
})


var GetList = function (that) {
  if (isRefresh == true) {
    //下拉刷新
    that.setData({
      refresh_h: false,
      load_h: true,
    });
  } else {
    //上拉加载
    that.setData({
      refresh_h: true,
      load_h: false,
    });
  }

  // 请求网络请求
  wx.request({
    url: parentUrl + curPage,
    data: {
      curPage: curPage,
      ctgTitles: ctgTitles,
      thumbnail: thumbnail,
    },
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: {
      'content-type': 'application/json'
    },// 设置请求的 header
    success: function (res) {
      console.log(that.data.list);
      var list;
      if (res.statusCode == 200) {
        if (that.data.list == undefined) {
          list = [];
        } else {
          list = that.data.list;
        }
        for (var i = 0; i < res.data.result.list.length; i++) {
          list.push(res.data.result.list[i]);
        }
        that.setData({
          list: list,
        });
        curPage++;
        //这里判断了加载的页数大于10页，就显示底线
        if (curPage > 10){
          that.setData({
            refresh_h: true,
            load_h: true,
            line_h: false,
          });
        }else{
          that.setData({
            refresh_h: true,
            load_h: true,
            line_h: true,
          });
        }
      } else {

      }
    },
    fail: function (res) {

    },
    complete: function () {
      // complete
    }
  })
}
