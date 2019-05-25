<template>
    <div>
        <h3 class="title">周末热游</h3>
        <ul>
            <li class="item " v-for="item of WeekendList" :key="item.id">
                <div class="item-img-wrapper">
                     <img :src="item.imgUrl" alt="" class="item-img">
                </div>
               
                <div class="item-info">
                    <p class="item-title">{{item.title}}</p>
                    <p class="item-desc">{{item.desc}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name:'HomeWeekend',
    data () {
        return {
            WeekendList: [
                {
                    id:'0001',
                    imgUrl:'http://img1.qunarzz.com/sight/p0/1603/85/85c883189bf7293390.water.jpg_600x330_fd753eb3.jpg',
                    title:'大连圣亚海洋世界',
                    desc:'浪漫大连首站，浪漫的海洋主题公园'
                },
                 {
                    id:'0002',
                    imgUrl:'http://img1.qunarzz.com/sight/p0/1603/85/85c883189bf7293390.water.jpg_600x330_fd753eb3.jpg',
                    title:'大连圣亚海洋世界',
                    desc:'浪漫大连首站，浪漫的海洋主题公园'
                },
                {
                    id:'0003',
                    imgUrl:'http://img1.qunarzz.com/sight/p0/1603/85/85c883189bf7293390.water.jpg_600x330_fd753eb3.jpg',
                    title:'大连圣亚海洋世界',
                    desc:'浪漫大连首站，浪漫的海洋主题公园'
                },
                {
                    id:'0004',
                    imgUrl:'http://img1.qunarzz.com/sight/p0/1603/85/85c883189bf7293390.water.jpg_600x330_fd753eb3.jpg',
                    title:'大连圣亚海洋世界',
                    desc:'浪漫大连首站，浪漫的海洋主题公园'
                }
            ]
        }
    }
}
</script>
<style lang="stylus" scoped>
    @import '~@/assets/styles/mixins.styl';
    .title
        margin-top:.2rem
        line-height:.8rem
        background:#eee
        text-indent:.2rem
    .item-img-wrapper
        height:0
        padding-bottom 50.3%
        .item-img
            width: 100% 
    .item-info
        padding: .45rem .15rem 0.1rem
        min-width: 0
        .item-title
            line-height: .54rem
            font-size: .32rem
            ellipsis()
        .item-desc
            line-height: .4rem
            color: #666
            ellipsis()
           
               
        

</style>


