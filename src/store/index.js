import Vue from 'vue'
import Vuex from 'vuex'
// import {reqCategoryListDate} from '../api/index'
import home from './modules/home'
import search from './modules/search'
import detail from './modules/detail'
import user from './modules/user'

Vue.use(Vuex)
const state = {
}
const actions = {
}
const mutations = {
}
const getters = {
}

const store = new Vuex.Store({
    state,
    actions,
    mutations,
    getters,
    modules: { home , search,detail,user}//和store对象进行关联，类似于组件注册
})

export default store