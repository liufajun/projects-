<template>
    <div>
        <h3 class="title">热销推荐</h3>
        <ul>
            <li class="item border-bottom" v-for="item of RecommendList" :key="item.id">
                <img :src="item.imgUrl" alt="" class="item-img">
                <div class="item-info">
                    <p class="item-title">{{item.title}}</p>
                    <p class="item-desc">{{item.desc}}</p>
                    <button class="item-button">查看详情</button>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name:'HomeRecommend',
    data () {
        return {
            RecommendList: [
                {
                    id:'0001',
                    imgUrl:'http://img1.qunarzz.com/sight/p0/1508/89/895a1b7add84f23faca053ce9e3153db.water.jpg_200x200_99ae30ee.jpg',
                    title:'大连圣亚海洋世界',
                    desc:'浪漫大连首站，浪漫的海洋主题公园'
                },
                 {
                    id:'0002',
                    imgUrl:'http://img1.qunarzz.com/sight/p0/1508/89/895a1b7add84f23faca053ce9e3153db.water.jpg_200x200_99ae30ee.jpg',
                    title:'大连圣亚海洋世界',
                    desc:'浪漫大连首站，浪漫的海洋主题公园'
                },
                {
                    id:'0003',
                    imgUrl:'http://img1.qunarzz.com/sight/p0/1508/89/895a1b7add84f23faca053ce9e3153db.water.jpg_200x200_99ae30ee.jpg',
                    title:'大连圣亚海洋世界',
                    desc:'浪漫大连首站，浪漫的海洋主题公园'
                },
                {
                    id:'0004',
                    imgUrl:'http://img1.qunarzz.com/sight/p0/1508/89/895a1b7add84f23faca053ce9e3153db.water.jpg_200x200_99ae30ee.jpg',
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
    .item
        overflow :hidden
        display:flex
        height:1.9rem
        .item-img
            width:1.7rem
            height:1.7rem
            padding:.1rem
        .item-info
            flex:1
            padding: .1rem
            min-width: 0
            .item-title
                line-height: .54rem
                font-size: .32rem
                ellipsis()
            .item-desc
                line-height: .4rem
                color: #666
                ellipsis()
            .item-button
                background:#ff9300 
                border-radius: .06rem 
                outline: none
                margin-top: .2rem
                padding:.06rem .2rem 
                color: #fff;
                font-family:'微软雅黑'

</style>


