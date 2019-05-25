// components/buy/index.js
Component({
    /**
     * 组件的属性列表(一般用于接收父组件传过来的值)
     */
    properties: {
        // 详情页购物车弹框关闭开关，默认为true(隐藏)
        hideBuy: {
            type: Boolean,
            value: true
        },
        partData: Object
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        //点击阴影部分隐藏详情页购物车弹框
        hideBuyView: function (e) {
            if (e.target.dataset.target == 'self')
                this.setData({
                    hideBuy: true
                })
        },
        //输入框值改变时 amount组件向父组件buy传递新数据，组件buy再传递给detail
        getCount: function (e) {
            this.triggerEvent('onGetCount', e.detail)
        },
        // 点击加入购物车按钮关闭弹框
        buy: function () {
            this.setData({
                hideBuy: true
            })
            // 注册事件(事件传递)
            this.triggerEvent('buyEvent')
        }
    }
})
