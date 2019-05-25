<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
/**
 * 解决登陆成功后刷新页面存储到vuex里的token数据消失问题
 * 这里的很多代码是Login.vue里的
 * 
 */
import jwt_decode from "jwt-decode";
export default {
  name: "app",
  created() {
    // 如果localStorage.eleToken存在则存储到vuex里
    if (localStorage.eleToken) {
      const decode = jwt_decode(localStorage.eleToken);
      this.$store.dispatch("setIsAutnenticated", !this.isEmpty(decode));
      this.$store.dispatch("setUser", decode);
    }
  },
  methods: {
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>


<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>
