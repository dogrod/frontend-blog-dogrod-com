// http request util for client
import axios from 'axios'

const JWT = window.localStorage.getItem('DR_JW_TOKEN')

const defaultHeaders = {
  'Accept': 'application/json, text/plain, */*; charset=utf-8',
  'Content-Type': 'application/json; charset=utf-8',
  'Pragma': 'no-cache',
  'Cache-Control': 'no-cache',
  'Authorization': `JWT ${JWT}`,
}

const axiosInstance = axios.create({ headers: defaultHeaders })

axiosInstance.defaults.withCredentials = true

axiosInstance.interceptors.request.use(
  // 拦截请求，添加 api 前缀
  (config) => {
    config.url = `/api${config.url}`
    return config
  },
  (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
)

export default axiosInstance
