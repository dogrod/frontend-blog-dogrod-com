import * as fs from 'fs'
import * as path from 'path'

import * as Koa from 'koa'

import logger from '../utils/logger'

const log = logger('transmit-bundle-files')

const readBundleFile = (filename: string) => {
  const filePath = path.join(process.cwd(), 'build', filename)

  log.info(`Read static file from ${filePath}`)

  return fs.readFileSync(filePath, 'utf-8')
}

export default async (ctx: Koa.Context, next: () => void) => {
  if (
    ctx.req.headers.accept
    && ctx.req.headers.accept.indexOf('application/json') > -1
  ) {
    log.info(`Request ${ctx.path} is not a static file request. Skipped.`)

    return await next()
  }

  ctx.set('Contetn-Type', 'text/html; charset=utf-8')
  ctx.body = readBundleFile('index.html')

  await next()
}