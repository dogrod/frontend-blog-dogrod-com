import * as ip from 'ip'
import * as Koa from 'koa'
import * as koaLogger from 'koa-logger'

import spaMiddleware from './middlewares/spa'
import Logger from './utils/logger'

const paths = require('../config/paths.js')
const appConfig = require(paths.appConfig)

const { isDev } = require(paths.env)

const logger = Logger('app')
const port = parseInt(appConfig.port, 10) || 9001

const app = new Koa()

app.use(koaLogger())

app.use(spaMiddleware())

app.listen(port, () => {
  if (!isDev) return

  logger.info(`
    > Koa server ready on port ${port}
    > You can access it via http://localhost:${port} or http://${ip.address()}:${port}
  `)

  /* tslint:disable-next-line */
  require('react-dev-utils/openBrowser')(`http://localhost:${port}`);
})
