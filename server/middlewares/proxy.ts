import * as Koa from 'koa'
import * as koaHttpProxy from 'koa-better-http-proxy'

import Logger from '../utils/logger'
import { URL } from 'url';

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
        const proxyURL = new URL(proxyConfig[prefix])
        
        const proxyPort = proxyURL.port
        const target = `${proxyURL.protocol}//${proxyURL.hostname}${proxyPort ? ':' : ''}${proxyPort}`
        const proxyPathPrefix = proxyURL.pathname

        ctx.url = `${proxyPathPrefix}${url.replace(prefix, '')}`
        proxyTarget = target
        
        logger.info(`Proxy target: ${target}, request URL ${ctx.url}`)
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