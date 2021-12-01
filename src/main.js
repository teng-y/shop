import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import store from './store'
import TypeNav from './components/TypeNav'
import './mock/mockServer'//启动mock服务器

Vue.config.productionTip = false
Vue.component(TypeNav.name,TypeNav)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
