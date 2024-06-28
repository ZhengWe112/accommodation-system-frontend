import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import permission from './permission'
import store from '../store/'
import { clearHttpRequestingList } from '@http/httpRequestList'
import routes from './routes'

Vue.$httpRequestList = []
Vue.use(Router)

let router = new Router({
  routes
})
// 每次路由跳转验证
router.beforeEach((to, from, next) => {
  if (to.meta.keepAlive) {
    store.commit('routecache/keepAlive', to.name)
  }
  clearHttpRequestingList()
  NProgress.start()
  // 白名单： 不需要登录就能访问的路由  登录  注册  找回密码。。。
  const whiteList = store.getters['permission/getWhiteList']
  if (whiteList.indexOf(to.name) > -1 || whiteList.indexOf(to.path) > -1) {
    // 目的地是白名单  直接放走
    next()
  } else if (!store.getters['user/getUserId']) { // 不在白名单必须要登录    1.看前端有没有缓存
    // 没有缓存  可能是前端缓存过期了  所以从后端去拿
    store.dispatch('user/fetchUserInfo').then(res => {
      if (res.status) {
        // 权限校验
        permission(store, routes, to, next)
      } else {
        switch (res.code) {
          case -500:
            next({ name: 'badGateway' })
            break
          case 70005:
            next({ name: 'login' })
            break
        }
      }
    })
  } else {
    // 权限校验
    permission(store, routes, to, next)
  }
})
router.afterEach(() => {
  NProgress.done()
})
export default router
