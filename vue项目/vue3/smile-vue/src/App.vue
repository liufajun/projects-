<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <transition>
      <keep-alive>
         <router-view/>
      </keep-alive>
     
    </transition>
    <Footer></Footer>
  </div>
</template>
<script>
import Footer from "@/components/Footer.vue";
export default {
  name: "app",
  components:{
    Footer
  },
  data(){
    return{
      active:0
    }
  }
}
</script>
<style lang="scss">
 html{
    font-size: calc( 100vw / 7.5 )
  }
 // 页面从右侧滑出左侧消失特效
 
  #app{
    width: 100%;
    padding-bottom: 50px;
    overflow-x: hidden;
    font-size: 14px;
  }
  .v-enter{
    opacity: 0;
    transform: translateX(100%);
  }
  .v-leave-to{
    opacity: 0;
    transform: translateX(-100%);
    // 解决页面从上往下位移问题
    position: absolute;
  }
  .v-enter-active,.v-leave-active{
    transition: all 0.35s ease;
  }
  img{
    vertical-align: middle;
  }
</style>
