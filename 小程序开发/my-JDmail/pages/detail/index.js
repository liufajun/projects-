// pages/detail/index.js
// 引入接口配置文件urlconfig
const interfaces = require('../../utils/urlconfig.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        partData: {}, //详情页数据
        baitiao: [],
        baitiaoSelectItem: {
            desc: "【白条支付】首单享立减优惠"
        },
        hideBaitiao: true, // 是否隐藏白条的遮罩
        hideBuy: true, // 是否购买的遮罩
        badgeCount: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 接收列表页传过来的id
        const id = options.id
        const self = this
        // 发送接口请求
        wx.showLoading({
            title: '加载中...',
        })
        wx.request({
            url: interfaces.productionDetail,
            success(res) {
                let result = null
                res.data.forEach(data => {
                    // 如果列表页传过来的商品id等与商品详情页的商品id，则获取这条数据
                    if (data.partData.id == id)
                        result = data
                })

                self.setData({
                    partData: result.partData,
                    baitiao: result.baitiao
                })
                wx.hideLoading()
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        // 页面跳转，刷新，购物车里的商品都会消失，所以在show生命周期函数
        const self = this
        wx.getStorage({
            key: 'cartInfo',
            success: function (res) {
                const cartArray = res.data
                self.setBadge(cartArray)
            },
        })
    },

    /**
     * 显示白条分期弹框
     */
    popBaitiaoView: function () {
        this.setData({
            hideBaitiao: false
        })
    },

    /**
     * 显示商品购物车弹框
     */
    popBuyView: function () {
        this.setData({
            hideBuy: false
        })
    },

    /*
        接收子组件白条弹框IOU传过来的值,并渲染到页面上(支付分期)
    */
    // 更新data
    updateSelectItem(e) { 
        console.log(e.detail)
        this.setData({
            baitiaoSelectItem: e.detail
        })
    },

    //输入框值改变时 amount组件向父组件buy传递新数据，组件buy再传递给detail
    updateCount(e) { 
        var partData = this.data.partData
        // 更新count
        partData.count = e.detail.val
        this.setData({
            partData: partData
        })
    },
    
    /**
     * 加入购物车
     */
    
    addCart() {
        var self = this
        //  wx.getStorage是获取本地存储，那么第一次进来就会没有数据，所以会走fail回调函数
        wx.getStorage({
            key: 'cartInfo',
            success(res) {
                const cartArray = res.data
                // 拿到现在添加的商品对象
                let partData = self.data.partData
                let isExit = false; // 判断数组是否存在该商品
                cartArray.forEach(cart => {
                    // id相同则存在该商品，则让两个对象的商品数量相加(就是购买数量)
                    if (cart.id == partData.id) { 
                        isExit = true
                        cart.total += self.data.partData.count
                        wx.setStorage({
                            key: 'cartInfo',
                            data: cartArray,
                        })
                    }
                })
                if (!isExit) { // 不存在该商品
                    partData.total = self.data.partData.count
                    cartArray.push(partData)
                    wx.setStorage({
                        key: 'cartInfo',
                        data: cartArray,
                    })
                }
                self.setBadge(cartArray)
            },
            fail() {
                /*
                    wx.getStorage是获取本地存储，那么第一次进来就会没有数据，所以会走fail
                    回调函数，所以要在这里获取数据并存储到本地

                */
                let partData = self.data.partData
                partData.total = self.data.partData.count
                let cartArray = []
                cartArray.push(partData)
                wx.setStorage({
                    key: 'cartInfo',
                    data: cartArray,
                })
                self.setBadge(cartArray)
            }
        })
        // 购物车提醒
        wx.showToast({
            title: '加入购物车成功',
            icon: 'success',
            duration: 3000
        })
    },

    /**
     * 设置购物车数量图标
    */
    setBadge(cartArray) {
        this.setData({
            badgeCount: cartArray.length
        })
    },

    /**
     * 跳转到购物车页面
     */
    showCartView: function () {
        wx.switchTab({
            url: '/pages/cart/index'
        })
    }
})