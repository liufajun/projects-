import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Nofind from './views/404.vue'
import Home from './views/Home.vue'
import InfoShow from './views/InfoShow.vue'
import CapitalFlow from './views/CapitalFlow.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
		{
      path: '*',
      name: '/404',
      component: Nofind
    },
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [{
          path: '',
          component: Home
        },
        {
          path: '/Home',
          name: 'home',
          component: Home
        },
        {
          path: '/infoshow',
          name: 'infoshow',
          component: InfoShow
        },
        {
          path: '/capitalflow',
          name: 'capitalflow',
          component: CapitalFlow
        }
      ]
    },

  ]
})

/**
 * 添加路由守卫
 * 根据本地存储的token来判断是否是登录，存在token则已经登录
 * 
 */
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.eleToken ? true : false;
  /**
   * 如果访问的是登录或注册页面则可以正常访问这两个页面，否则访问其他页面则需判断token是否存在(是否登录),
   * 如果已经登录则可以继续访问其他页面，否则跳转到登录页面
   */
  if (to.path == "/login" || to.path == "/register") {
    next();
  } else {
    isLogin ? next() : next("/login");
  }
})
export default router;
