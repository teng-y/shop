/**
 * 1、这个home.js文件是专门用来处理home组件（主页面）数据的
 * 2、这个相当于是一个独立的空间，只储存home中的数据
 * 
 * **/
import { reqCategoryListDate } from '../api/index'
const state = {
    categoryList: []
}
const actions = {
    //做异步操作
    //1、获取三级分类信息数据
    async getCategoryListDate(context) {
        const result = await reqCategoryListDate()

        //提交给mutations来操作state中的数据
        context.commit('saveCategoryListDate', result)
    }
}
const mutations = {
    //用来修改state中的数据
    saveCategoryListDate(state, payload) {
        state.categoryList = payload.data
    }
}
const getters = {}


export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}