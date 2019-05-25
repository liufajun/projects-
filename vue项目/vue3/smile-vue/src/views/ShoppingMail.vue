<template>
  <div class="shopping-mall">
    <!-- 头部区域 header -->
    <div class="search-bar">
      <van-row class="search-bar-container">
        <van-col span="3">
          <i class="iconfont iconlocation-fill"></i>
        </van-col>
        <van-col span="16">
          <input type="text" class="search-input" placeholder="请输入关键字">
        </van-col>
        <van-col span="5">
          <van-button size="mini">搜索</van-button>
        </van-col>
      </van-row>
    </div>
    <!-- swiper -->
    <Swiper></Swiper>
    <!-- type bar -->
    <TypeBar :iconList="iconList"></TypeBar>
    <!-- 商品推荐 -->
    <Recommend :recommendGoods="recommendGoods"></Recommend>
    <!-- floor 楼层 -->
    <Floor :floorData="floor1" :floorTitle="floorName.floor1"></Floor>
    <Floor :floorData="floor2" :floorTitle="floorName.floor2"></Floor>
    <Floor :floorData="floor3" :floorTitle="floorName.floor3"></Floor>
    <!-- 热卖商品 -->
    <HotSale :hotGoods="hotGoods"></HotSale>
    <!-- <Footer></Footer> -->
  </div>
</template>
<script>
import Swiper from "@/components/Swiper.vue";
import TypeBar from "@/components/TypeBar.vue";
import Recommend from "@/components/Recommend.vue";
import Floor from "@/components/Floor.vue";
import HotSale from "@/components/HotSale.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "shoppingMail",
  data() {
    return {
      bannerPicArray: [],
      iconList: [],
      adBanner: "",
      recommendGoods: [], //商品推荐
      floor: {},
      floor1: [],
      floor2: [],
      floor3: [],
      floorName: {},
      hotGoods: [] //热卖商品
    };
  },
  components: {
    Swiper,
    TypeBar,
    Recommend,
    Floor,
    HotSale,
    Footer
  },
  created() {
    this.getHomeData();
  },
  methods: {
    getHomeData() {
      let that = this;
      this.$http
        .get("api/home")
        .then(response => {
          that.iconList = response.data.data.iconList;
          this.adBanner = response.data.data.advertesPicture.PICTURE_ADDRESS;
          this.bannerPicArray = response.data.data.slides;
          this.recommendGoods = response.data.data.recommend;
          this.floor1 = response.data.data.floor1;
          this.floor2 = response.data.data.floor2;
          this.floor3 = response.data.data.floor3;
          this.floorName = response.data.data.floorName;
          this.hotGoods = response.data.data.hotGoods;
        })
        .catch(error => {});
    }
  }
};
</script>
<style lang="scss" scoped>
$colorE5017d: #e5017d;
$headerHeight: 46px;
$paddingLeftRight: 0.4rem;
.shopping-mall {
  width: 100%;
  padding-top: $headerHeight;
  overflow-x: hidden;
  .search-bar {
    height: $headerHeight;
    // padding: 0 $paddingLeftRight;
    background-color: $colorE5017d;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    .search-bar-container {
      .van-col {
        height: $headerHeight;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
      }
    }
    .iconlocation-fill {
      color: #fff;
      font-size: 24px;
    }
    .search-input {
      box-sizing: border-box;
      height: 32px;
      border: 0;
      border-bottom: 1px solid #fff !important;
      background-color: $colorE5017d;
      color: #fff;
      width: 95%;

    }
    input::-webkit-input-placeholder {
      color: #fff;
    }
    input::-moz-placeholder {
      color: #fff;
    }
  }
  .type-bar {
    background-color: #fff;
    border-radius: 0.11rem;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    div {
      padding: 0.15rem;
      font-size: 12px;
      text-align: center;
      flex: 1;
    }
  }
}
</style>

