import axios from 'axios'

const mockAjax = axios.create({
    baseURL:'/mock',
    timeout:1000
})

//请求拦截器
mockAjax.interceptors.request.use(config=>{
    return config
},error=>{
    return Promise.reject(error)
})

//响应拦截器
mockAjax.interceptors.response.use(response=>{
    return response.data
},error=>{
    return Promise.reject(error)
})

export default mockAjax

