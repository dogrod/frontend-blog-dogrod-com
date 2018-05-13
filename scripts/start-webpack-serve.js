const serve = require('webpack-serve')
const history = require('connect-history-api-fallback')
const connect = require('koa-connect')

const paths = require('../config/paths')
const config = require('../config/webpack.config.base')

const appConfig = require(paths.appConfig)

const port = parseInt(appConfig.port, 10) || 3000

serve({
  config,
  port,
  host: '0.0.0.0',
  add: (app, middleware, options) => {
    app.use((ctx, next) => {
      // Allow cross origin
      ctx.set('Access-Control-Allow-Origin', '*');
      return next()
    })

    app.use(connect(history()))
  }
})