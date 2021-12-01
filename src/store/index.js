import Vue from 'vue'
import Vuex from 'vuex'
// import {reqCategoryListDate} from '../api/index'
import home from './home'
import search from './search'

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
    modules: { home , search}//和store对象进行关联，类似于组件注册
})

export default store