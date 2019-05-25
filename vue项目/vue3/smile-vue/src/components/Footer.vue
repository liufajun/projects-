<template>
  <div class="footer-bar">
    <van-tabbar v-model="active" active-color="#07c160" inactive-color="#000">
      <van-tabbar-item icon="home-o"  to="/ShoppingMall">首页</van-tabbar-item>
       <!-- <van-tabbar-item icon="bars" to="/goods">详情</van-tabbar-item> -->
       <van-tabbar-item icon="todo-list-o" to="/category">分类</van-tabbar-item>
      <!-- <van-tabbar-item icon="search" to="/member">会员</van-tabbar-item> -->
      <van-tabbar-item icon="shopping-cart-o" to="/cart">购物车</van-tabbar-item>
      <!-- <van-tabbar-item icon="search" to="/login">登录</van-tabbar-item> -->
      <van-tabbar-item icon="user-circle-o" to="/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "footerBars",
  data() {
    return {
      // 底部导航栏子项的下标
      active: 0,
      nowPath:'',  //当前路径
    }
  },
  created () {
    this.changeTabBarActive();
  },
  updated(){
    this.changeTabBarActive();
  },
  methods: {
    changeTabBarActive(){
               this.nowPath = this.$route.path
              //  if(this.nowPath=='/cart'){
              //      this.active=2
              //  }
              switch(this.nowPath){
                case "/ShoppingMall":
                  this.$router.push({name:'ShoppingMall'})
                  break; 
                case "/category":
                  this.$router.push({name:'category'})
                  break; 
                  case "/cart":
                  this.$router.push({name:'cart'})
                  break; 
                  case "/user":
                  this.$router.push({name:'user'})
                  break;   
              }
           },
    
       //changeTabbar() { 
          //      switch(this.active){
          //          case 0:
          //               this.$router.push({name:'ShoppingMall'})
          //               break;
          //          case 1:
          //               this.$router.push({name:'category'})
          //               break;
          //          case 2:
          //               this.$router.push({name:'Cart'})
          //               break;
          //           case 3:
          //               this.$router.push({name:'user'})
          //               break;
          //      }
          //}
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$colorE5017d: #e5017d;
.footer-bar{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
}
.van-tabbar{
//   background-color: $colorE5017d;
}
</style>
