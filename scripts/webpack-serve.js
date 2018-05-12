const serve = require('webpack-serve')

const config = require('../config/webpack.config.base')

const port = parseInt(process.env.PORT, 10) || 3000

serve({
  config,
  port,
  host: '0.0.0.0',
})