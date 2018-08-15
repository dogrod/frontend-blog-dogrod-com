import * as ip from 'ip'
import * as Koa from 'koa'
import * as koaLogger from 'koa-logger'

import errorMiddleware from './middlewares/error'
import spaMiddleware from './middlewares/spa'
import httpMiddleware from './middlewares/http'
import proxyMiddleware from './middlewares/proxy'
import Logger from './utils/logger'

const paths = require('../config/paths.js')
const appConfig = require(paths.appConfig)

const { isDev } = require(paths.env)

const logger = Logger('app')
const port = parseInt(appConfig.port, 10) || 9001

const app = new Koa()

app.use(koaLogger())

app.use(errorMiddleware)

app.use(spaMiddleware())

app.use(httpMiddleware)

app.use(proxyMiddleware())

app.listen(port, () => {
  if (!isDev) {
    return
  }

  const currentIP = ip.address()

  logger.info(`
    > Koa server ready on port ${port}
    > You can access it via http://localhost:${port} or http://${currentIP}:${port}
  `)

  /* tslint:disable-next-line */
  require('react-dev-utils/openBrowser')(`http://${currentIP}:${port}`);
})
