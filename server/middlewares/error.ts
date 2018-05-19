import * as Koa from 'koa'
import logger from '../utils/logger'

const log = logger('error-handler')

export default async (ctx: Koa.Context, next: () => void) => {
  try {
    await next()
  } catch (error) {
    log.error(`An error occurred: ${error.message}`)
    const status = error.code ? 500 : error.status || 500
    
    const message = error.message || '网络错误，请稍后重试'

    const body = error.code
      ? {
        code: error.code,
        message,
      } : message

    ctx.status = status
    ctx.body = body
  }
}