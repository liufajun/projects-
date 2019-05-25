<template>
  <div class="footer-bar">
    <van-tabbar v-model="active" active-color="#1989fa">
      <van-tabbar-item icon="home-o"  to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/member">会员</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" to="/shopcar">购物车</van-tabbar-item>
      <van-tabbar-item icon="search" to="/search">搜索</van-tabbar-item>
      <van-tabbar-item icon="user-circle-o" to="/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "footerBars",
  data() {
    return {
      active: 0
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
