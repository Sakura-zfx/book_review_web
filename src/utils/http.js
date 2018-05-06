// 封装axios

import axios from 'axios'
import qs from 'qs'
import localStore from './localStorage'

axios.defaults.timeout = 5000

// request拦截器
axios.interceptors.request.use(
  config => {
    if (localStore.get('jwt_token')) {
      config.headers.Authorization = `bearer ${localStore.get('jwt_token')}`
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
          localStore.remove('jwt_token')
          router.replace({
            path: '/login',
            query: { redirect: router.currentRoute.fullPath }
          })
      }
    }
    return Promise.reject(error.response.data)
  }
)

export default axios