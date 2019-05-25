<template>
     <!--Hot Area-->
        <div class="hot-area">
            <div class="hot-title">热卖商品</div>
            <div class="hot-goods">
            <!--这里需要一个list组件-->
                <van-list>
                    <van-row>
                        <van-col span="12" v-for="(item , index) in hotGoods" :key="index">
                                <GoodsInfo :goodsId="item.goodsId" :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price">

                                </GoodsInfo>

                        </van-col>
                    </van-row>
                </van-list>
            </div>
        </div>
</template>

<script>
import GoodsInfo from "@/components/GoodsInfo.vue";
    export default {
        name: "hotSale",
        props: ["hotGoods"],
        data () {
            return {

            }
        },
        components: {
            GoodsInfo
        },
        methods: {

        }
    }
</script>

<style lang="scss" scoped>
    .hot-title{
        text-align: center;
        font-size: 14px;
        height: 0.65rem;
        line-height: 0.65rem;
        background: pink;
    }
</style>