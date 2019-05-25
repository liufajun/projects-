import Vue from 'vue'
import Vant from 'vant'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueLazyload from 'vue-lazyload'
import 'vant/lib/index.css'
import './registerServiceWorker'

Vue.use(Vant);
Vue.use(VueLazyload, {
  // preLoad: 1.3,
  // error: require("../src/assets/loading.gif"),
  // loading: require("../src/assets/loading.gif"),
  // attempt: 1,
  // // the default is ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend']
  // listenEvents: [ 'scroll' ]
});
Vue.prototype.$http = axios;
Vue.config.productionTip = false

/* 路由发生变化修改页面title */
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
      document.title = to.meta.title
  }
  next()
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
