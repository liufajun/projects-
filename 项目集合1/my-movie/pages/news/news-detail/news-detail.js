// pages/news/news-detail/news-detail.js
var newsData = require("../../data/newsDetail-data.js");
const innerAudioContext = wx.createInnerAudioContext();

Page({

  data: {
     newsid:"",
     collected:"",
     musicFlag:true
  },

  onLoad: function (options) {
     //这样写可以直接绑定对象里的直接儿子属性例如:{{title}}
     this.setData(newsData.newsData[options.newsId]);
     this.setData({
        newsid:options.newsId
     });
     //第一次进入判断是否存在本地存储以及是否收藏
     var newsCollect = wx.getStorageSync("newsCollect");
      //如果newsCollect存在,则表示以前收藏过或取消过收藏
      if(newsCollect){
         // 获取的是点击收藏时的状态数据
         var newCollect = newsCollect[options.newsId];
         this.setData({
            collected:newCollect
         })
      }else{
         // 第一次进入，是根本不存在数据
         var newsCollect = {};
         //把当前的ia存入nesCollect对象中，然后默认值指定为false
         newsCollect[options.newsId] = false;
         //存入本地存储中去
         wx.setStorageSync("newsCollect",newsCollect);
      }
  },
  collectTap: function (event) {
     //注意：newsCollect是所有数据的集合
     var newsCollect = wx.getStorageSync('newsCollect');
      //注意：newCollect是当前的一条数据
      var newCollect = newsCollect[this.data.newsid]
      //点击的时候如果收藏则取消，未收藏则收藏
      newCollect = !newCollect;
      //更新到本地存储中(更新点击的那条数据，不能单独更新某条数据，所以也要更新整个对象)
      newsCollect[this.data.newsid] = newCollect;
      wx.setStorageSync("newsCollect",newsCollect);
      // 数据关联到视图中
      this.setData({
         collected:newCollect
      })
      // console.log(newsCollect)

      // 缓存:在小程序中，如果用户不主动清除，则一直存在，缓存最大上限10M
      // 同步
      // wx.setStorageSync('key', "哈哈哈");
      // 修改缓存
      // wx.setStorageSync('key', {
      //   game:"穿越火线",
      //   dev:"timi"
      // })
      // //获取缓存
      // var myData = wx.getStorageSync("key");
      // console.log(myData);
      // 删除缓存
      // wx.removeStorageSync('key');
      // 清除所有缓存
      // wx.clearStorageSync();
      // 缓存存储数据值得格式
      // var newsCollected = {
      //   0:true,
      //   1:false
      // }
      //  console.log(newsData.newsData[options.newsId])
      // this.setData({
      //    detailData: detailData
      // })

  },
  onShareTap: function (event) {
     wx.showActionSheet({
        itemList: [
           "乐章",
           "听过",
           "乐趣",
           "聊聊"
        ],
        itemColor: "#c00",
        success: function (res) {
           wx.showToast({
              title: "暂时无法前往",
              duration: 1000
           })
        }
     })
  },
  
   onShareAppMessage: function () {
      return {
         title: '微信小程序联盟',
         desc: '最具人气的小程序开发联盟!',
         path: '/page/news/news-detail/news-detail'
      }

   },
      
   onPlayerMusic: function (event) {
      innerAudioContext.autoplay = true
      innerAudioContext.loop = true
      innerAudioContext.volume = 0.7
      innerAudioContext.src = 'http://fs.w.kugou.com/201810022220/e4fec6598e4d2fd40fa82cf9bade19b4/G014/M0B/06/14/Tg0DAFUJgsSAXfd-AEvvHDNAkmE307.mp3'
      // innerAudioContext.onPlay(() => {
      //    console.log('开始播放')
      // })
         this.setData({
            musicFlag: !this.data.musicFlag
         })
      if(this.data.musicFlag){
         innerAudioContext.pause(() => {
            console.log('暂停')
         })
      }else{
         innerAudioContext.play(() => {
            console.log('播放')
         })
      }
         
   },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (event) {

   
  },

  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
   onShow:function (){
      // innerAudioContext.autoplay = true
      // innerAudioContext.loop = true
      // innerAudioContext.volume = 0.7
      // innerAudioContext.src = 'http://fs.w.kugou.com/201810022220/e4fec6598e4d2fd40fa82cf9bade19b4/G014/M0B/06/14/Tg0DAFUJgsSAXfd-AEvvHDNAkmE307.mp3'
      // innerAudioContext.onPlay(() => {
      //    console.log('开始播放')
      // })
      // innerAudioContext.onError((res) => {
      //    console.log(res.errMsg)
      //    console.log(res.errCode)
      // })
   }
})