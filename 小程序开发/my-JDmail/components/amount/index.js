// components/amount/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        // 商品数量
        count: { 
            type: Number,
            value: 1
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     * 1.amount传值给父组件buy,组件buy再传值给父组件detail
     */
    methods: {
        inputChangeHandle: function (event) {
            // 获取数量增减输入框里的值
            var val = event.detail.value; 

            var myEventDetail = {
                val: val
            }
            // bindinput='inputChangeHandle' 输入框值改变时 向父组件buy传递新数据，组件buy再传递给detail
            this.triggerEvent('myevent', myEventDetail)
        },

        //商品自减运算 
        subtract: function () {
            var count = this.data.count;
            count > 1 ? count-- : 1
            // 更新count
            this.setData({
                count: count
            })
            //  更新后的count赋值给val
            var myEventDetail = {
                val: count
            }
            // 把减法运算后的输入框里的值商品数量val传给父组件buy
            this.triggerEvent('myevent', myEventDetail)
            // 点击减号触发
            this.triggerEvent('subevent')
        },

        //商品自加运算
        add: function () {
            var count = this.data.count;
            this.setData({
                count: ++count
            })
            var myEventDetail = {
                val: count
            }
            // 把加法运算后的输入框里的值商品数量val传给父组件buy
            this.triggerEvent('myevent', myEventDetail)
            // 点击加号触发
            this.triggerEvent('addevent')
        }
    }
})

