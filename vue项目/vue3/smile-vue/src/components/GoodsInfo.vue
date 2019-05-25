<template>
  <div class="goods-info" @click="goGoodsPage()">
    <div class="goods-image">
      <img v-lazy="goodsImage">
    </div>
    <div class="goods-name">{{goodsName}}</div>
    <div class="goods-price">￥{{ goodsPrice.toFixed(2) }}</div>
  </div>
</template>

<script>
export default {
  name: "goodsInfo",
  // 首页传过来的
  props: ["goodsImage", "goodsName", "goodsPrice", "goodsId"],
  data() {
    return {};
  },
  methods: {
    goGoodsPage() {
      // 跳转到Goods.vue商品详情页面,name为/goods的name属性
      this.$router.push({name:"goods",query:{goodsId:this.goodsId}})
    }
  }
};
</script>

<style lang="scss" scoped>
.goods-info {
  padding-bottom: 0.2rem;
  .goods-image {
      text-align: center;
      img{
          width: 95%;vertical-align: middle;
      }
  }
  .goods-name {
    padding: 0 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .goods-price {
    text-align: center;
    color: #e5017d;
  }
}
</style>