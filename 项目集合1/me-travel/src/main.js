import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastClick from 'fastclick'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import '@/assets/styles/iconfont.css'
import './assets/styles/border.css'
import './assets/styles/reset.css'
import 'swiper/dist/css/swiper.css'

Vue.config.productionTip = false
fastClick.attach(document.body)
Vue.use(VueAwesomeSwiper, /* { default global options } */ )
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// new Vue({
//   el:'#app',
//   router,
//   components:{App},
//   template:'<App/>'
// })
