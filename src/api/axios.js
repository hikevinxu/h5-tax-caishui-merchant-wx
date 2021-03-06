import axios from 'axios'
import Vue from 'vue'
import router from '@/router/index'
import store from '@/store/index'
// import qs from 'qs'
import { Toast } from 'vant'
import api from '@/api/api'
import { getParams } from '@/utils/global'

Vue.use(Toast)

// 响应时间
axios.defaults.timeout = 100000
axios.defaults.baseURL = process.env.VUE_APP_API

// 测试地址（内网)
// axios.defaults.baseURL = 'http://tax-caishui-merchant.int.anniu-inc.com'
// 线上环境地址
// axios.defaults.baseURL = 'https://merchant-api.caishuiyu.com'
// 本地环境地址
// axios.defaults.baseURL = 'http://172.100.8.46:8081'  

axios.interceptors.request.use((config) => {
  // 在发送请求之前做某件事
  if (config.method === 'post') {
    // config.data = qs.stringify(config.data)
  }
  const accessToken = localStorage.getItem('accessToken')
  if (accessToken) {
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    config.headers['Authorization'] = accessToken
  }
  return config
}, (error) => {
  Toast('错误的传参')
  return Promise.reject(error)
})

// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
  // 对响应数据做些事
  if (res.status !== 200) {
    Toast('系统异常')
    return Promise.reject(res)
  } else if (res.data.code !== 0) {
    let info = '系统异常'
    switch (res.data.code) {
      // 异常处理
      case 500:
        return Promise.resolve(res)
        // info = res.data.msg
      // 余额购买时，商户余额不足
      case 600:
        return Promise.reject(res)
      // 需求状态发生改变
      case 20001:
        return Promise.resolve(res)
      // 未绑定商户
      case 20002:
        // router.push('/bindPhone')
        location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9adab1432e4d7cf1&redirect_uri=${location.origin}/bindPhone&response_type=code&scope=snsapi_base&state=123#wechat_redirect`
        return Promise.reject(res)
      case 10000:
        // let pathList = ['/hall', '/clue', '/mine']
        // if(res.request.responseURL.indexOf('/merchant/apply/status') > -1 && pathList.includes(location.pathname)) {
        //   return Promise.resolve(res)
        // }else {
        //   let params = {
        //     code: getParams().code
        //   }
        //   api.registerHasBind(params).then(res => {
        //     if(res.code == 0){
        //       localStorage.setItem('openId', res.data.openId)
        //       if(res.data.hasBind == false){
        //         router.replace('/bindPhone');
        //       }else {
        //         location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9adab1432e4d7cf1&redirect_uri=${location.origin}/bindLogin&response_type=code&scope=snsapi_base&state=123#wechat_redirect`;
        //       }
        //     }
        //   })
        //   .catch((error) => {
        //     console.log(error)
        //   })
        // }
        location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9adab1432e4d7cf1&redirect_uri=${location.origin}/bindLogin&response_type=code&scope=snsapi_base&state=123#wechat_redirect`
        return Promise.reject(res)
    }
    if(res.data.msg) {
      info = res.data.msg
    }
    Toast(info)
    return Promise.reject(res)
  }
  return Promise.resolve(res)
}, (error) => {
  Toast('网络异常')
  console.log(error)
  return Promise.reject(error)
})

// 返回一个Promise(发送post请求)
export function fetchPost (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

// 返回一个Promise(发送get请求)
export function fetchGet (url, param) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params: param })
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const baseURL = axios.defaults.baseURL;
export const baseURL_ = process.env.VUE_APP_API_;

// 返回一个Promise(发送get请求)
export function fetchAppGet (url, param) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params: param, baseURL: baseURL_ })
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
