import axios from 'axios';
// 引入信息提示,加载动画组件
import {
  Message,
  Loading
} from 'element-ui';

let loading //定义loading变量

function startLoading() { //使用Element loading-start 方法
  loading = Loading.service({
    lock: true,
    text: '加载中...',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

function endLoading() { //使用Element loading-close 方法

  loading.close()
}

// 请求拦截  设置统一header(第一个参数:请求成功函数,第二个参数:请求失败函数)
axios.interceptors.request.use(config => {
  // 开始加载动画
  startLoading()
  // 判断是否登录(登录成功才会有token)
  if (localStorage.eleToken) {
   // 设置统一的请求头(登录成功后其他接口就可以正常的使用token了)
    config.headers.Authorization = localStorage.eleToken
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截  401 token过期处理
axios.interceptors.response.use(response => {
  // 结束加载动画
  endLoading()
  return response
}, error => {
  // 发生错误时要结束加载动画
  endLoading()
  // 错误提醒
  Message.error(error.response.data)

  const { status } = error.response
  // token过期无效则要清楚本地存储的token,然后跳转到登录页面
  if (status == 401) {
    Message.error('token值无效，请重新登录')
    
    localStorage.removeItem('eleToken')

    // 跳转到登录页面
    router.push('/login')
  }

  return Promise.reject(error)
})

export default axios