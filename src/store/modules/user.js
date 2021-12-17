import { reqCode, reqRegister, reqLogin, reqGetUserInfo, reqLogout } from "@/api"

const state = {
    code: '',
    token: localStorage.getItem('token_key'),
    userInfo: {}
}
const mutations = {
    //获取验证码
    RECEIVE_CODE(state, code) {
        state.code = code
    },
    //登录获取token
    RECEIVE_TOKEN(state, token) {
        state.token = token
    },
    //获取用户信息
    RECEIVE_USERINFO(state, userInfo) {
        // console.log(userInfo);
        state.userInfo = userInfo
        // console.log(state.userInfo);
    },
    REMOVE_USERINFO(state) {
        state.token = ''
        state.userInfo = {}
    }
}
const actions = {
    //获取验证码
    async getCode({ commit }, phone) {
        const result = await reqCode(phone)
        if (result.code === 200) {
            commit('RECEIVE_CODE', result.data)
            return result.data
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    //注册
    async userRegister({ commit }, user) {
        const result = await reqRegister(user)
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    //登录获取token
    async userLogin({ commit }, user) {
        const result = await reqLogin(user)
        if (result.code === 200) {
            commit('RECEIVE_TOKEN', result.data.token)

            localStorage.setItem('token_key', result.data.token)
            return 'ok'
        } else {
            // console.log(result.data);
            return Promise.reject(new Error('failed'))
        }
    },
    // 根据token获取用户信息
    async getUserInfo({ commit }) {
        const result = await reqGetUserInfo()
        if (result.code === 200) {
            commit('RECEIVE_USERINFO', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    //退出登录
    async userLogout({ commit }) {
        const result = await reqLogout()
        if (result.code === 200) {
            commit('REMOVE_USERINFO')
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    }
}
const getters = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}