
<template>
  <div class="recommend-area">
    <div class="recommend-title">商品推荐</div>
    <div class="recommend-body">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item,index) in recommendGoods " :key="index">
          <div class="recommend-item">
            <img v-lazy="item.image" width="80%">
            <div class="goods-name">{{item.goodsName}}</div>
            <div class="goods-price">￥{{ item.price.toFixed(2) }}</div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "recommend",
  props: ["recommendGoods"],
  data() {
    return {
      swiperOption: {
        slidesPerView: 3
      }
    };
  },
  filters: {
    moneyFilter(money) {
      return money.toFixed(2);
    }
  },
  components: {
    swiper,
    swiperSlide
  }
};
</script>

<style lang="scss" scoped>
$baseColor: #e5017d;
.recommend-area {
  background-color: #fff;
}
.recommend-title {
  border-bottom: 1px solid #eee;
  font-size: 14px;
  padding: 0.1rem;
  color: $baseColor;
}
.recommend-body {
  border-bottom: 1px solid #eee;
}
.recommend-item {
  width: 99%;
  border-right: 1px solid #eee;
  font-size: 12px;
  text-align: center;
  .goods-name {
    width: 100%;
    box-sizing: border-box;
    padding: 0 .1rem;
    text-align: justify;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
  }
  .goods-price{
    color: $baseColor;
  }
}
</style>