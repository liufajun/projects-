// pages/news/news.js
var newsData = require("../data/news-data.js");
// console.log(newsData.newsData)
Page({
  data: {
    userData: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userData: newsData.newsData
    })
    // console.log(this.data.userData)
  },

  onReady: function () {

  },
   // 跳转到详情页
   goNewsDetail: function (event) {
      var newsId = event.currentTarget.dataset.newsid;
    
      wx.navigateTo({
         url: 'news-detail/news-detail?newsId=' + newsId
      })
      console.log(newsId)
   },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }
})