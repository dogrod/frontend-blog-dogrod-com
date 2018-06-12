// Webpack config in development environment
const ip = require('ip')
const webpack = require('webpack')

const paths = require('./paths')

const config = require('./webpack.config.base')()
const appConfig = require(paths.appConfig)

const currentIP = ip.address()

const PUBLIC_PATH = `http://${currentIP}:${appConfig.port + 100}/`

config.output.publicPath = PUBLIC_PATH

config.mode = 'development'
// Enable sourcemaps for debugging webpack's output.
config.devtool = 'inline-source-map'

config.plugins = (config.plugins || []).concat([
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"',
    },
  }),
])

// Define handler for files with .scss/.css extensions
config.module.rules.push({
  test: /\.scss?$/,
  use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
}, {
  test: /\.css?$/,
  use: ['style-loader', 'css-loader', 'postcss-loader'],
})

module.exports = config