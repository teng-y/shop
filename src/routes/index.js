import Vue from "vue";
import VueRouter from 'vue-router'

//注册组件
Vue.use(VueRouter)

//终极解决多次触发push或者repalce，报错的问题
//NavigationDuplicated
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function (location, onResolved, onRejected) {
  if (onResolved === undefined && onRejected === undefined) {
    // originPush.call目的是让VueRouter实例化对象去调用
    //如果不加，那就是window在调用
    return originPush.call(this, location).catch(() => { })
  } else {
    return originPush.call(this, location, onResolved, onRejected)
  }
}

VueRouter.prototype.replace = function (location, onResolved, onRejected) {
  if (onResolved === undefined && onRejected === undefined) {
    // originPush.call目的是让VueRouter实例化对象去调用
    //如果不加，那就是window在调用
    return originReplace.call(this, location).catch(() => { })
  } else {
    return originReplace.call(this, location, onResolved, onRejected)
  }
}

import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Search from '../pages/Search'
//创建实例并添加路由规则
const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      name:'home',
      path: '/home',
      component: Home,
      meta:{
        isShowTypeNav:true
      }
    },
    {
      name:'login',
      path: '/login',
      component: Login,
      meta:{
        isHiddenFooter:true
      } 
    },
    {
      name:'register',
      path: '/register',
      component: Register,
      meta:{
        isHiddenFooter:true
      } 
    },
    {
      name:'search',
      path: '/search',
      component: Search
    },
  ]
})

export default router