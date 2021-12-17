/**
 * 1、这个home.js文件是专门用来处理home组件（主页面）数据的
 * 2、这个相当于是一个独立的空间，只储存home中的数据
 * 
 * **/
import { reqCategoryListDate,reqBannerListData,reqFloorListData } from '@/api/index'
const state = {
    categoryList: [],
    bannerList:[],
    floorList:[]
}
const actions = {
    //做异步操作
    //1、获取三级分类信息数据
    async getCategoryListDate(context) {
        const result = await reqCategoryListDate()

        if(result.code === 200) {
            //提交给mutations来操作state中的数据
            context.commit('saveCategoryListDate', result)
        }else{
            console.log(result.message);
        }
    },
    async getBannerListData(context){
        const result = await reqBannerListData()
        if(result.code === 200){
            context.commit('saveBannerListData',result)
        }else {
            console.log(result.message);
        }

    },
    async getFloorListData({commit}){
        const result = await reqFloorListData()
        if(result.code === 200){
            commit('SAVE_FLOOR_LIST_DATA',result)
        }else {
            console.log(result.message);
        }

    }
}
const mutations = {
    //用来修改state中的数据
    saveCategoryListDate(state, payload) {
        state.categoryList = payload.data
    },
    saveBannerListData(state,payload){
        state.bannerList = payload.data
    },
    SAVE_FLOOR_LIST_DATA(state,payload){
        state.floorList = payload.data
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