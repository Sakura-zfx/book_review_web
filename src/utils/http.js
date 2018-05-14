// 封装axios

import axios from 'axios'
import qs from 'qs'
import Cookie from 'js-cookie'
import localStore from './localStorage'
import router from '../router/index'

axios.defaults.timeout = 5000

// request拦截器
axios.interceptors.request.use(
  config => {
    if (localStore.get('jwt_token')) {
      config.headers.Authorization = `bearer ${localStore.get('jwt_token').token}`
    }
    if (config.method.toLowerCase() === 'put' || config.method.toLowerCase() === 'post') {
      const data = config.data

      config.data = qs.stringify(data)
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// response拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          Cookie.remove('userId')
          Cookie.remove('userName')
          Cookie.remove('expires')
          localStore.remove('jwt_token')
          if (router.currentRoute.fullPath.indexOf('admin') >= 0) {
            router.replace({
              path: '/admin/login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            })
          } else {
            router.replace({
              path: '/',
              query: {
                redirect: router.currentRoute.fullPath
              }
            })
          }
      }
    }
    return Promise.reject(error.response.data)
  }
)

export default axios
