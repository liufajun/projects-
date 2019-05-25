<template>
    <div class="icons">
        <swiper :options="swiperOption">
            <!-- 循环页数 -->
            <swiper-slide  class="swiper-box" v-for="(page,index) of pages" :key="index">
                <div class="icon" v-for="item of page" :key="item.id">
                    <a href="javascript:;" class="a-icon">
                        <img class="icon-img" :src="item.imgUrl" alt="">
                        <p class="icon-keywords">{{item.desc}}</p>
                    </a>
                </div>
               
                
            </swiper-slide>
        
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
       
        
    </div>
</template>
<script>
export default {
    name:'HomeIcons',
   data () {
      return {
        swiperOption: {
          // some swiper options/callbacks
          // 所有的参数同 swiper 官方 api 参数
          pagination: '.swiper-pagination',
          loop: false
        },
        iconList: [
            {
                id:'0001',
                aHref:'',
                imgUrl:'http://img1.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png',
                desc:'景点门票'
            },
            {
                id:'0002',
                imgUrl:'http://img1.qunarzz.com/piao/fusion/1804/ff/fdf170ee89594b02.png',
                desc:'广东必游'
            },
            {
                id:'0003',
                imgUrl:'http://img1.qunarzz.com/piao/fusion/1803/6a/45f595250c73d102.png',
                desc:'夏日玩水'
            },
            {
                id:'0004',
                imgUrl:'http://img1.qunarzz.com/piao/fusion/1803/20/831d62d2e1c7be02.png',
                desc:'文化古迹'
            },
            {
                id:'0005',
                imgUrl:'http://img1.qunarzz.com/piao/fusion/1803/76/eb88861d78fb9902.png',
                desc:'动植物园'
            },
             {
                id:'0006',
                imgUrl:'http://img1.qunarzz.com/piao/fusion/1803/6c/9e54a8540fee0102.png',
                desc:'故宫'
            },
            {
                id:'0007',
                imgUrl:'http://img1.qunarzz.com/piao/fusion/1804/5a/13ceb38dcf262f02.png',
                desc:'一日游'
            },
            {
                id:'0008',
                imgUrl:'http://img1.qunarzz.com/piao/fusion/1803/6c/9e54a8540fee0102.png',
                desc:'国宝巡礼'
            },
            {
                id:'0009',
                imgUrl:'http://img1.qunarzz.com/piao/fusion/1803/6c/9e54a8540fee0102.png',
                desc:'田园风光'
            }
        ]
        
      }
    },
    computed: {
        pages () {
            const pages = []
            this.iconList.forEach((item,index) => {
                // 向下取整(一页显示8个数据),page代表页数
                const page = Math.floor(index / 8)
                if (!pages[page]){
                    pages[page] = []
                }
                pages[page].push(item)
            });
            return pages
        }
    }
}
</script>
<style lang="stylus" scoped>
     @import '~@/assets/styles/varibles.styl';
     @import '~@/assets/styles/mixins.styl';
    .icons
        width:100%
        padding-top:.2rem
        .swiper-container
            padding-bottom:.5rem
       .swiper-box
            display:flex
            flex-direction:row
            flex-wrap:wrap
            .icon
                width:25%
                padding-bottom:.2rem
                .a-icon
                    display :flex
                    flex-direction :column
                    align-items:center
                    justify-content:center
                    .icon-img
                        width:1.15rem
                        height:1.15rem
                    .icon-keywords
                        width:100%
                        text-align:center
                        font-size:.22rem
                        height:.44rem
                        line-height:.44rem
                        ellipsis()
                       

</style>

