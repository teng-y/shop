// 1、引入模快
import axios from 'axios';
import 'nprogress/nprogress.css' //引入进度条样式
import NProgress from 'nprogress' // 引入进度条模块
//2、创建实例对象
const ajax = axios.create({
    baseURL:'http://39.98.123.211',//配置统一服务器地址
    timeout: 5000,
})

// 3、添加请求拦截器
ajax.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    NProgress.start()
    return config;
  }, function (error) {
    // 对请求错误做些什么
    NProgress.start()
    return Promise.reject(error);
  });

//4、 添加响应拦截器
ajax.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    NProgress.done()
    return response.data;
  }, function (error) {
    // 对响应错误做点什么
    NProgress.done()
    return Promise.reject(error);
  });

//5、暴露
export default ajax