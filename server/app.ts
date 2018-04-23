import * as Koa from 'koa'
// import * as Router from 'koa-router'
import * as proxy from 'koa-better-http-proxy'

import * as serve from 'koa-static'
import * as koaLogger from 'koa-logger'
import * as path from 'path'

import transmitBundleFile from './middlewares/transmit-bundle-files'
import logger from './utils/logger'

const serverConfig = require(path.join(process.cwd(), 'server.config.js'))

const app = new Koa()
// const router = new Router()
const log = logger('app')

const port = parseInt(serverConfig.port, 10) || 9002

app.use(koaLogger())

app.use(transmitBundleFile)

app.use(serve(path.join(process.cwd(), 'build')))

// app.use(router.routes())

app.use(proxy(serverConfig.proxy['/api'], {}))

app.listen(port, () => {
  log.info(`> Ready on http://localhost:${port}`)
})