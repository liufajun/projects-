<template>
    <div class="wrapper">
         <!-- <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback"> -->
        <swiper :options="swiperOption">
            <!-- slides -->
            <swiper-slide v-for="item of swiperList">
                <img class="swiper-img" :src="item.imgUrl" alt="" :key="item.id">
            </swiper-slide>
             
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
        
        </swiper>
    </div>
   
    
</template>
<script>
export default {
    name: 'HomeSwiper',
    data () {
      return {
        swiperOption: {
          // some swiper options/callbacks
          // 所有的参数同 swiper 官方 api 参数
          pagination: '.swiper-pagination',
          loop: true
        },
        swiperList: [
            {
                id:'0001',
                imgUrl:'http://img1.qunarzz.com/piao/fusion/1807/66/e5a5cec881702f02.jpg_750x200_67bb5691.jpg'
            },
            {
                id:'0002',
                imgUrl:'http://img1.qunarzz.com/piao/fusion/1809/87/534cf2e0a71fff02.jpg_750x200_5c778719.jpg'
            },
            {
                id:'0003',
                imgUrl:'http://img1.qunarzz.com/piao/fusion/1809/86/deb33800de224c02.jpg_750x200_74fb795e.jpg'
            },
            {
                id:'0004',
                imgUrl:'http://img1.qunarzz.com/piao/fusion/1805/70/4f2c67e740012c02.jpg_750x200_10db80b8.jpg'
            },
            {
                id:'0005',
                imgUrl:'http://img1.qunarzz.com/piao/fusion/1809/45/cb5d7b479e2fdd02.jpg_750x200_3729c776.jpg'
            }
        ]
      }
    }
    // ,
    // computed: {
    //   swiper() {
    //     return this.$refs.mySwiper.swiper
    //   }
    // },
    // mounted() {
    //   // current swiper instance
    //   // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    //   console.log('this is current swiper instance object', this.swiper)
    //   this.swiper.slideTo(3, 1000, false)
    // }
}
</script>
<style lang="stylus" scoped>
    .wrapper >>> .swiper-pagination-bullet-active
        background: #fff !important 
    .swiper-img
        width:100%
</style>


