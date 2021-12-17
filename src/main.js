import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import store from './store'
//启动mock服务器
import './mock/mockServer'

//引入并注册全局组件
import TypeNav from './components/TypeNav'
import Pagination from './components/Pagination'
import Copyright from './components/Copyright'
//引入ajax接口并注册全局
import * as API from './api'

import '@/plugins/lazyload'
import '@/plugins/element-ui'

Vue.config.productionTip = false
Vue.component(TypeNav.name,TypeNav)
Vue.component(Pagination.name,Pagination)
Vue.component(Copyright.name,Copyright)


new Vue({
  router,//注入router，让所有的组件对象都能通过this.$router和this.$route找到路由器对象和当前
  store,
  beforeCreate() {  // 注册全局事件总线
    Vue.prototype.$bus = this,
    Vue.prototype.$API = API
  },
  render: h => h(App),
}).$mount('#app')
