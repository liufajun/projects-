<template>
  <div class="category">
    <div class="header">
      <van-nav-bar title="商品分类" left-text="返回" left-arrow @click-left="goBack"></van-nav-bar>
    </div>
    <div id="category-main">
      <van-row>
        <van-col span="6">
          <div id="lefNav">
            <ul>
              <li
                v-for="(item,index) in category"
                :key="index"
                @click="clickCategory(index,item.ID)"
                :class="{categoryActice:categoryIndex == index }"
              >{{item.MALL_CATEGORY_NAME}}</li>
            </ul>
          </div>
        </van-col>
        <van-col span="18">
          <div class="tabCategorySub">
            <van-tabs swipeable v-model="active" @click="onClickCategorySub">
              <van-tab v-for="(item,index) in categorySub" :key="index" :title="item.MALL_SUB_NAME"></van-tab>
            </van-tabs>
          </div>
          <div id="list-div">
            <!-- 下拉刷新:下拉刷新时会触发 refresh 事件，在事件的回调函数中可以进行同步或异步操作，操作完成后将 v-model 设置为 false，表示加载完成。 -->
            <van-pull-refresh v-model="isRefresh" @refresh="onRefresh" loading-text="刷新中">
              <!-- 上拉加载:List 组件通过loading和finished两个变量控制加载状态，当组件滚动到底部时，会触发load事件并将loading设置成true。此时可以发起异步操\
              作并更新数据，数据更新完毕后，将loading设置成false即可。若数据已全部加载完毕，则直接将finished设置成true即可。-->
              <van-list v-model="loading" :finished="finished" @load="onLoad" finished-text="没有更多数据了">
                <div
                  class="list-item"
                  @click="goGoodsInfo(item.ID)"
                  v-for="(item,index) in goodList"
                  :key="index"
                >
                  <div class="list-item-img">
                    <img :src="item.IMAGE1" width="100%" :onerror="errorImg">
                  </div>
                  <div class="list-item-text">
                    <div class="goods-desc">{{item.NAME}}</div>
                    <div class="goods-price">￥{{item.ORI_PRICE.toFixed(2)}}</div>
                  </div>
                </div>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-col>
      </van-row>
    </div>
    <!-- <Footer></Footer> -->
  </div>
</template>

<script>
import url from "@/urlApi.js";
import Footer from "@/components/Footer.vue";
export default {
  name: "categoryList",
  data() {
    return {
      category: [], //分类数据
      categoryIndex: 0, //左侧导航栏点击选中的下标
      categorySub: [], //右侧区域商品数据
      active: 0, //右侧头部tab切换项的激活值
      loading: false, //组件滚动到底部时，会触发load事件并将loading设置成true
      finished: false, //上拉加载是否有数据,数据已全部加载完毕，则将finished设置成true即可。
      page: 1, //商品列表的页数
      goodList: [], //右侧头部tab对应的商品列表信息
      categorySubId: "", //商品子类ID
      isRefresh: false, //下拉刷新
      errorImg: 'this.src="' + require("@/assets/errorimg.png") + '"'
    };
  },
  components: {
    Footer
  },
  created() {
    this.getCategory();
  },
  mounted() {},
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    // 获取左侧侧边栏数据
    getCategory() {
      let that = this;
      this.$http
        .get(url.getCateGoryList)
        .then(response => {
          if (response.data.code == 200 && response.data.message) {
            this.category = response.data.message;
            // console.log(this.category);
            //页面加载和刷新时左侧导航栏第一个子项的数据不会渲染到右侧区域(要点击才会渲染到右侧区域),要让页面一刷新默认把左侧导航栏第一项对应的数据渲染到右侧区域
            this.getCategorySubByCategoryID(this.category[0].ID);
          } else {
            this.$toast.fail("服务器错误，数据取得失败");
          }
        })
        .catch(error => {});
    },
    //左侧导航栏子项点击事件
    clickCategory(index, categoryId) {
      this.categoryIndex = index;
      this.page = 1;
      this.finished = false;
      this.goodList = [];
      // 调用该方法获取左侧导航兰子项对应的数据(然后渲染到右侧显示区域)
      this.getCategorySubByCategoryID(categoryId);
    },
    //根据大类读取小类列表数据
    getCategorySubByCategoryID(categoryId) {
      let that = this;
      this.$http
        .post(url.getCateGorySubList, { categoryId: categoryId })
        .then(response => {
          if (response.data.code == 200 && response.data.message) {
            this.categorySub = response.data.message;
            // 不设置为0则右侧区域头部的tab切换不是默认选中第一个
            this.active = 0;
            // 页面加载和刷新时左侧导航栏第一个子项的数据不会渲染到右侧区域(要点击才会渲染到右侧区域),要让页面一刷新默认把左侧导航栏第一项对应的数据渲染到右侧区域
            this.categorySubId = this.categorySub[0].ID;
            this.onLoad();
          } else {
            this.$toast.fail("服务器错误，数据取得失败");
          }
        })
        .catch(error => {});
    },
    //上拉加载数据
    onLoad() {
      setTimeout(() => {
        // 有categorySubId就是他自己,没有就获取id
        this.categorySubId = this.categorySubId
          ? this.categorySubId
          : this.categorySub[0].ID;
        // 获取数据
        this.getGoodList();
      }, 500);
    },
    // 下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.isRefresh = false; //加载完成
        this.finished = false;
        this.goodList = []; //清空数据
        this.page = 1;    //设置下拉刷新页数,否则下拉刷新时没有数据
        this.getGoodList(); //下拉刷新时重新获取数据
        // this.onLoad(); //调用刷新数据
       
      }, 500);
    },
    // 获取小类对应的数据
    getGoodList(categoryId) {
      let that = this;
      this.$http
        .post(url.getGoodsListByCategorySubID, {
          categorySubId: this.categorySubId,
          page: that.page
        })
        .then(response => {
          if (response.data.code == 200 && response.data.message.length) {
            this.page++;
            // 商品刷新时旧数据和新数据合并在一起(相当于数据拼接)
            this.goodList = this.goodList.concat(response.data.message);
          } else {
            // 数据请求完成
            this.finished = true;
          }
          this.loading = false;
        })
        .catch(error => {});
    },
    // 右侧区域头部tab切换点击事件
    onClickCategorySub(index, title) {
      // 获取子类别id
      this.categorySubId = this.categorySub[index].ID;
      this.goodList = [];
      this.finished = false;
      this.page = 1;
      this.onLoad();
    },
    // 跳转到商品详情页
    goGoodsInfo(goodsId){
      // neme属性值就是路由配置里的name属性值
      this.$router.push({name:"goods",params:{goodsId:goodsId}})
    }
  }
};
</script>

<style lang="scss" scoped>
$colorE5017d: #e5017d;
$fontSize: 14px;
$height: 46px;
$scrollHeight: calc(100vh - 96px);
.category {
  width: 100%;
  padding-top: $height;
}
// header
.header {
  width: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}
.van-nav-bar {
  background: $colorE5017d;
  height: $height;
  line-height: $height;
}
.van-hairline--bottom::after {
  border-bottom-width: 0px;
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
// #category-main css
#category-main {
  width: 100%;
}
#lefNav::-webkit-scrollbar {
  display: none;
}
#lefNav {
  background-color: aliceblue;
  height: $scrollHeight;
  overflow-y: scroll;
}
li {
  padding: 0 0.1rem;
  box-sizing: border-box;
  font-size: 16px;
  text-align: center;
  letter-spacing: 1px;
  color: #333;
  height: 60px;
  line-height: 60px;
}
// 左侧点击选中样式
.categoryActice {
  background-color: #fff;
  border-left: 3px solid $colorE5017d;
  color: $colorE5017d;
}
.tabCategorySub {
  background-color: #e4e7ed;
}
#list-div::-webkit-scrollbar {
  display: none;
}
#list-div {
  width: 100%;
  height: calc(100vh - 140px);
  overflow-y: scroll;
}
.list-item {
  background-color: #fff;
  border-bottom: 1px solid #f0f0f0;
  // text-align: center;
  display: flex;
  flex-direction: row;
  padding: .4rem 0.15rem;
  box-sizing: border-box;
}
.list-item-img {
  flex: 8;
}
.list-item-text {
  flex: 16;
  margin-top: 10px;
  margin-left: 10px;
  .goods-desc{
    text-align: justify;
    display: -webkit-box; 
    -webkit-box-orient:vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp:2; 
  }
  .goods-price{
    padding: .2rem 0;
    text-align: center;
    color: $colorE5017d;
  }
}
</style>