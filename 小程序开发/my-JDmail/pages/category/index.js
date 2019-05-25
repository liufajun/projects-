// pages/category/index.js
const interfaces = require('../../utils/urlconfig.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        navLeftItems: [],
        navRightItem: [],
        //设置左侧导航栏点击选中时的下标标识
        curIndex: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const self = this
        wx.showLoading({
            title: '加载中...',
        })
        wx.request({
            url: interfaces.productions,
            header: {
                'content-type': 'application/json' // 默认值，返回的数据设置为json数组格式
            },
            success(res) {
                self.setData({
                    navLeftItems: res.data.navLeftItems,
                    navRightItems: res.data.navRightItems
                })
                wx.hideLoading();
                //console.log(res.data)
            }
        })
    },
   /**
    * 左侧导航栏点击选中时获取下标,判断下标是否相等来添加选中样式
    */
    switchLeftTab(e){
        // 获取点击选中项的下标,并转换成数字类型
        let index = parseInt(e.currentTarget.dataset.index);
        // 把获取到的index给左侧导航栏点击选中时的下标标识
        this.setData({
            curIndex: index
        })
    },
    /**
   * 点击进入列表页
   * 列表页参数 title
  */
    showListView(e) {
        let txt = e.currentTarget.dataset.txt
        // 跳转到列表页，并把title传过去,根据title在列表页里获取对应的数据
        wx.navigateTo({
            url: '/pages/list/index?title=' + txt
        })
    }
})