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

// import Home from '../pages/Home'
// import Login from '../pages/Login'
// import Register from '../pages/Register'
// import Search from '../pages/Search' 
import Detail from '../pages/Detail'
import AddCartSuccess from '../pages/AddCartSuccess'
import ShopCart from '../pages/ShopCart'
import Center from '../pages/Center'
import Pay from '../pages/Pay'
import PaySuccess from '../pages/PaySuccess'
import Trade from '../pages/Trade'
import store from '@/store'

import MyOrder from '../pages/Center/MyOrder'
import GroupOrder from '../pages/Center/GroupOrder'

//路由懒加载
const Home = ()=>import('../pages/Home')
const Login = ()=>import('../pages/Login')
const Register = ()=>import('../pages/Register')
const Search = ()=>import('../pages/Search')
//创建实例并添加路由规则
const router = new VueRouter({
  mode: 'history',
  routes: [
    //路由重定向到home页面
    {
      path: '/',
      redirect: '/home'
    },
    //商城主界面
    {
      name:'home',
      path: '/home',
      component: Home,
      meta:{
        isShowTypeNav:true
      }
    },
    //登录界面
    {
      name:'login',
      path: '/login',
      component: Login,
      meta:{
        isHiddenFooter:true
      } 
    },
    //注册界面
    {
      name:'register',
      path: '/register',
      component: Register,
      meta:{
        isHiddenFooter:true
      } 
    },
    //商品搜索界面
    {
      name:'search',
      path: '/search/:keyword?',
      component: Search
    },
    //商品详情页
    {
      name:'detail',
      path:'/detail/:id',
      component:Detail,
      props:true
      // props配置是简化操作传递过去的路由参数
    // 三种
    // 布尔
    // props:true,  会把路由传递的params参数映射为组件内部的属性
    // 对象
    // props:{username:'赵丽颖'} 会把对象内部的属性映射为组件内部的属性，一般用来传递一个额外的数据
    // 函数
    // 可以手动的去映射params或者query参数。
    // props(route){
    //   return {keyword:route.params.keyword,category1Id:route.query.category1Id}
    // }
    },
    //商品添加购物车成功界面
    {
        name: 'addcartsuccess',
        path: '/addCartSuccess',
        component:AddCartSuccess,
        beforeEnter:(to,from,next)=>{
          let skuNum = to.query.skuNum
          let skuInfo = sessionStorage.getItem('skuInfo_key')
          if(skuNum&&skuInfo){
            next()
          }else{
            next('/')
          }
        }
    },
    //购物车界面
    {
      name:'shopcart',
      path:'/shopcart',
      component:ShopCart
    },
    //订单中心
    {
      name:'center',
      path:"/center",
      component:Center,
      children:[
        {
          path:'myorder',
          component:MyOrder
        },
        {
          path:'grouporder',
          component:GroupOrder
        },
        {
          path:'',
          redirect:'myorder'
        }
      ],
      
    },
    //支付界面
    {
      name:'pay',
      path:'/pay',
      component:Pay,
      beforeEnter:(to,from,next)=>{
        if(from.path === '/trade'){
          next()
        }else{
          next('/')
        }
      }
    },
    //支付成功界面
    {
      name:'paysuccess',
      path:'/paysuccess',
      component:PaySuccess,
      beforeEnter:(to,from,next)=>{
        if(from.path==='/pay'){
          next()
        }else{
          next('/')
        }
      }
    },
    //订单提交页面
    {
      name:'trade',
      path:'/trade',
      component:Trade,
      beforeEnter:(to,from,next)=>{
        if(from.path ==='/shopcart'){
          next()
        }else{
          next('/')
        }
      }
    },
    {
      path: '/communication',
      component: () => import('@/pages/Communication/Communication'),
      children: [
        {
          path: 'event',
          component: () => import('@/pages/Communication/EventTest/EventTest'),
          meta: {
            isHideFooter: true
          },
        },
        {
          path: 'model',
          component: () => import('@/pages/Communication/ModelTest/ModelTest'),
          meta: {
            isHideFooter: true
          },
        },
        {
          path: 'sync',
          component: () => import('@/pages/Communication/SyncTest/SyncTest'),
          meta: {
            isHideFooter: true
          },
        },
        {
          path: 'attrs-listeners',
          component: () => import('@/pages/Communication/AttrsListenersTest/AttrsListenersTest'),
          meta: {
            isHideFooter: true
          },
        },
        {
          path: 'children-parent',
          component: () => import('@/pages/Communication/ChildrenParentTest/ChildrenParentTest'),
          meta: {
            isHideFooter: true
          },
        },
        {
          path: 'scope-slot',
          component: () => import('@/pages/Communication/ScopeSlotTest/ScopeSlotTest'),
          meta: {
            isHideFooter: true
          },
        }
      ],
    },
  ],
  //控制滚动行为
  scrollBehavior(to,from,savedPosition){
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
})
router.beforeEach(async (to, from, next) => {
  let token = store.state.user.token
  let userInfo = store.state.user.userInfo
  // console.log( store.state.user.userInfo);
  if(token){
    if(to.path === '/login'){
      next('/')
    }else{
      if(userInfo.name){
        next()
      }else{
        try {
          await store.dispatch('user/getUserInfo')
          next()
        } catch (error) {
          store.dispatch('user/userLogout')
          next('/login')
        }
      }
    }
  }else{
    let target = to.path
    if(target.startsWith('/trade') || target.startsWith('/pay') || target.startsWith('/center')){
      next('/login?redirect='+target)
    }else{
      next()
    }
  }
})

export default router