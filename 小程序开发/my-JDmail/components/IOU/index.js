// components/IOU/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        hideBaitiao: { // 是否隐藏白条的遮罩
            type: Boolean,
            value: true
        },
        baitiao: { // 分期内容的数据
            type: Array
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        selectIndex: 0 // 选中的下标
    },

    /**
     * 组件的方法列表
     * 白条弹出层逻辑:
     *      1.点击弹出框阴影区域需关闭白条弹出层
     *      2.点击弹出框右顶部的交叉可关闭白条弹出层
     *      3.点击立即打白条按钮符合条件才可以关闭白条弹出层
     *          1.点击立即打白条按钮时有选中选项才可以关闭白条弹出层
     *      4.currentTarge,target区别总结：
     *          e.currentTarget.dataset 代表的是，注册了监听点击事件的组件。
     *          e.target.dataset 代表的是，实际触发了点击事件的组件。
     */
    methods: {
        // 根据点击对象的data-属性来判断点击的对象来隐藏白条弹框
        hideBaitiaoView: function (e) { 
            if (e.target.dataset.target == 'self')
                this.setData({
                    hideBaitiao: true
                })
        },
        // 选择白条分期每个项添加点击事件
        selectItem: function (e) {

            //获取点击的白条分期每个项的下标
            var index = e.currentTarget.dataset.index
            //获取白条数据
            var baitiao = this.data.baitiao
            //遍历数据让所有的select变为false
            for (var i = 0; i < baitiao.length; i++) {
                baitiao[i].select = false
            }
            //然后让点击选中的那个选项的select变为true
            baitiao[index].select = !baitiao[index].select
            // 更新data
            this.setData({
                baitiao: baitiao,
                selectIndex: index
            })
        },
        // 点击打白条按钮
        makeBaitiao: function () { 
            // 点击打白条按钮关闭弹窗
            this.setData({
                hideBaitiao: true
            })
            //获取点击选中的那项
            const selectItem = this.data.baitiao[this.data.selectIndex]
            this.triggerEvent('updateSelect', selectItem)
        },
    }
})
