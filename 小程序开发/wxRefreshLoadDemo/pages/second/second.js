// pages/second/second.js
const parentUrl = "http://apicloud.mob.com/v1/cook/menu/search?name=%E7%BA%A2%E7%83%A7%E8%82%89&cid=0010001007&key=17113fceca309&size=20&page=";
var curPage = 0;
var ctgTitles;
var thumbnail;
var isFirst = true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    load_h: true,//加载
    line_h: true,//底线
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //设置第一次数据
    wx.startPullDownRefresh;
    var that = this;
    GetList(that);
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("监听用户下拉动作");
    var that = this;
    curPage = 0;
    isFirst = true;
    that.setData({
      list: [],
    })
    GetList(that);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("监听用户上拉拉动作");
    var that = this;
    GetList(that);
  },

})


var GetList = function (that) {
  //设置加载提示窗是否显示
  if (isFirst == true){
    //第一次请求数据
    that.setData({
      load_h: true,
    });
    isFirst = false;
  }else{
    that.setData({
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
      // console.log(that.data.list);
      var list;
      if (res.statusCode == 200) {
        //成功停止刷新
        wx.stopPullDownRefresh;
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
        if (curPage > 10) {
          that.setData({
            load_h: true,
            line_h: false,
          });
        } else {
          that.setData({
            load_h: true,
            line_h: true,
          });
        }
      } else {

      }
    },
    fail: function (res) {
      //失败停止刷新
      wx.stopPullDownRefresh;
    },
    complete: function () {
      // complete
    }
  })
}
