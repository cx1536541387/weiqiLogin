import Vue from 'vue'
import axios from 'axios'
Vue.prototype.$axios = axios
import qs from 'qs'
Vue.prototype.$qs = qs;

// 参数可以只写config 后面调用写成config.success
// 也可以不写.then  直接 return instance(config)
export function request(config, success, failure) {
  // 1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000
  })

  // // 2.拦截器
  // instance.interceptors.request.use(config => {
  //   return config
  // }, err => {
  //   //console.log(err);
  // })

  // // 2.2响应拦截
  // instance.interceptors.response.use(res => {
  //   return res.data
  // }, err => {
  //   console.log(err);
  // })

  // 3.发送真正的网络请求
  return instance(config)
}