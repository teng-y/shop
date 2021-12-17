import { reqSearchGoodsData } from "@/api/index";

const state = {
    goodsList:{}
}

const actions = {
    async getSearchGoodsData({commit},searchParams){
        const result = await reqSearchGoodsData(searchParams)

        commit('SAVE_SEARCH_GOODS_DATA',result)
    }
}
const mutations = {
    SAVE_SEARCH_GOODS_DATA(state,payload){
        // console.log(payload.data);
        state.goodsList = payload.data
    }
}
const getters = {
    trademarkList(state){
        return state.goodsList.trademarkList
    },
    attrsList(state){
        return state.goodsList.attrsList
    },
    goodsList(state){
        return state.goodsList.goodsList
    },
    total(state){
        return state.goodsList.total
    }
}
export default {
    namespaced:true,
    state,
    actions,
    mutations,
    getters
}