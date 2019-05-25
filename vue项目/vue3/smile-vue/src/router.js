import Vue from 'vue'
import Router from 'vue-router'
import ShoppMall from './views/ShoppingMail.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/ShoppingMall',
      name: 'ShoppingMall',
      meta:{title:"首页"},
      component: ShoppMall
    },
    {
      path: '/register',
      name: 'register',
      meta:{title:"用户注册"},
      component: () => import( /* webpackChunkName: "about" */ './views/Register.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta:{title:"用户登录"},
      component: () => import( /* webpackChunkName: "about" */ './views/Login.vue')
    },
    {
      path: '/goods',
      name: 'goods',
      meta:{title:"商品详情"},
      component: () => import( /* webpackChunkName: "about" */ './views/Goods.vue')
    },
    {
      path: '/category',
      name: 'category',
      meta:{title:"商品分类"},
      component: () => import( /* webpackChunkName: "about" */ './views/CategoryList.vue')
    },
    {
      path: '/user',
      name: 'user',
      meta:{title:"个人中心"},
      component: () => import( /* webpackChunkName: "about" */ './views/User.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      meta:{title:"个人中心"},
      component: () => import( /* webpackChunkName: "about" */ './views/Cart.vue')
    },
    {
      path: '/',
      redirect: '/ShoppingMall'
    }
  ]
})
