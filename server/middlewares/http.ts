import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import Koa from 'koa'

import Logger from '../utils/logger'

interface ExtraAxiosRequestConfig {
  _requestStartTimeStamp: number
}

const logger = Logger('http')

// limit methods usage
const methods = ['get', 'post', 'put', 'delete']

const defaultHeaders = {
  Accept: 'application/json, text/plain, */*; charset=utf-8',
  'Cache-Control': 'no-cache', // disable cache api data
  'Content-Type': 'application/json; charset=utf-8',
  Pragma: 'no-cache', // disable cache in HTTP/1.0
}

const axiosInstance = axios.create({
  headers: defaultHeaders,
  timeout: 20 * 1000,
})

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig & ExtraAxiosRequestConfig) => {
    config._requestStartTimeStamp = Date.now()

    const requestMethod = config.method || ''

    logger.info(`--> Remote server request: '${requestMethod.toUpperCase()} ${config.url}', body: ${JSON.stringify(config.data, null, 2)}`)

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    const config = response.config as AxiosRequestConfig & ExtraAxiosRequestConfig

    const requestMethod = config.method || ''

    logger.info(`<-- Remote server response(${response.status}) cost ${Date.now() - config._requestStartTimestamp}ms for '${requestMethod.toUpperCase()} ${config.url}': ${JSON.stringify(response.data, null, 2)}`)

    return response
  },
  (error) => {
    const errorObject = {
      message: error.message,
      status: error.response.status
    }

    return Promise.reject(errorObject)
  }
)

export default (ctx: Koa.Context, next: () => void) => {
  const http = {}

  methods.forEach((method) => {
    http[method] = (...args: any[]) => {
      let config
      const emptyConfig = { headers: {} }

      if (/get|delete/.test(method)) {
        config = args[1] = args[1] || emptyConfig
      } else {
        config = args[2] = args[2] || emptyConfig
      }

      config.headers.cookie = ctx.req.headers.cookie || ''

      return axiosInstance[method](...args)
        .then((response: AxiosResponse) => {
          return response.data
        })
    }
  })

  ctx.http = http
  return next()
}