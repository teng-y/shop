import Vue from 'vue'
import Vuex from 'vuex'
// import {reqCategoryListDate} from '../api/index'
import home from './home'

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
    modules: { home }//和store对象进行关联，类似于组件注册
})

export default store