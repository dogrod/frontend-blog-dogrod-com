import * as Koa from 'koa'
import * as koaHttpProxy from 'koa-better-http-proxy'

import Logger from '../utils/logger'

const logger = Logger('proxy')

const paths = require('../../config/paths.js')
const appConfig = require(paths.appConfig)

const proxyMiddleware = () => {
  return async (ctx: Koa.Context, next: () => Promise<any>) => {
    const url = ctx.url
    let proxyTarget = ''

    const proxyConfig = appConfig.forward

    Object.keys(proxyConfig).forEach((prefix: string) => {
      if (url.startsWith(prefix)) {
        const target = proxyConfig[prefix]

        ctx.url = url.replace(prefix, '')
        proxyTarget = target
        
        logger.info(`Catch a proxy request: ${prefix} => ${proxyTarget}`)
      }
    })

    if (!proxyTarget) {
      logger.info(`No proxy request found. Skipped.`)
      return next()
    }

    logger.info(`Request '${url}' will be forward to '${proxyTarget + ctx.url}'`);

    return koaHttpProxy(
      proxyTarget,
      {}
    )(ctx, next)
  }
}

export default proxyMiddleware