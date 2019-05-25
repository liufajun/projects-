<template>
  <div id="goodsDetail">
    <div class="header">
      <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="goBack">
        <!-- <van-icon name="search" size="16px" slot="right"/> -->
      </van-nav-bar>
    </div>
    <div class="goods-main">
      <div class="topImg">
        <img :src="goodsInfo.IMAGE1" width="100%">
      </div>
      <div class="goods-name">{{goodsInfo.NAME}}</div>
      <div class="goods-price">
        价格 :
        <span>￥{{goodsPrice}}</span>
      </div>
      <div>
        <!--  swipeable:滑动切换;sticky:吸顶-->
        <van-tabs swipeable sticky>
          <van-tab title="商品详情">
            <div class="detail" v-html="goodsInfo.DETAIL"></div>
          </van-tab>
          <van-tab title="评论">评论制作中</van-tab>
        </van-tabs>
      </div>
    </div>

    <div class="goods-bottom">
      <van-button bottom-action>加入购物车</van-button>
      <!-- 直接触发 sku 内部事件，通过内部事件执行 onBuyClicked 回调 -->
      <van-button type="primary" bottom-action>立即购买</van-button>
    </div>
  </div>
</template>

<script>
import url from "@/urlApi.js";
export default {
  name: "goods",
  data() {
    return {
      goodsId: "",
      goodsInfo: {},
      goodsPrice: ""
    };
  },
  created() {
    /**
     * GoodsInfo.vue(首页把商品id传过来的)把商品id传给商品详情页是使用query方式
     * CategoryList.vue把商品id传过来是使用params方式
     * 跳转传参方式不一样需做兼容
     */
    this.goodsId = this.$route.query.goodsId ? this.$route.query.goodsId : this.$route.params.goodsId;
    console.log(this.goodsId);
    this.getGoodsInfo();
  },
  methods: {
    getGoodsInfo() {
      let that = this;
      this.$http
        .post(url.getDetailGoodsInfo, { goodsId: that.goodsId })
        .then(response => {
          if (response.data.code == 200 && response.data.message) {
            this.goodsInfo = response.data.message;
            this.goodsPrice = this.goodsInfo.PRESENT_PRICE.toFixed(2);
          } else {
            this.$toast.fail("服务器错误，数据获取失败");
          }
        })
        .catch(error => {});
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
$colorE5017d: #e5017d;
$fontSize: 16px;
$height: 46px;
// header css
.header {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}
.goods-main{
  padding-top: 46px;
}
.van-nav-bar {
  background: $colorE5017d;
  height: $height;
  line-height: $height;
}
.van-hairline--bottom::after {
  border-bottom-width: 0px;
}
.van-nav-bar__arrow {
  font-size: 18px;
}
.van-nav-bar__left,
.van-nav-bar__right {
  font-size: $fontSize;
}
.van-nav-bar .van-icon {
  color: #fff;
}

.van-nav-bar__title {
  color: #fff;
  font-size: $fontSize;
}
.van-nav-bar__text {
  color: #fff;
}
// .goods-main css
.goods-name,
.goods-price {
  background-color: #fff;
  text-align: center;
}
.goods-price span {
  color: $colorE5017d;
}
.detail {
  font-size: 0px;
}
// .goods-bottom css
.goods-bottom {
  position: fixed;
  bottom: 0px;
  left: 0px;
  background-color: #fff;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-flow: nowrap;
}
.goods-bottom > div {
  flex: 1;
  padding: 0.1rem;
}
.van-button--bottom-action {
  height: 46px;
  line-height: 46px;
  font-size: $fontSize;
}
</style>