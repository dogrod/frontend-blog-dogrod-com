// Webpack config in production environment
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = require('./webpack.config.base')()
const upyunConfig = require(path.resolve(fs.realpathSync(process.cwd()), 'upyun.config.js'))

config.output.publicPath = upyunConfig
  ? `${upyunConfig.baseUrl}${upyunConfig.remotePathPrefix}/`
  : '/'

// Difference with dev environment
config.output.filename = '[name].[hash:7].js'
config.output.chunkFilename = '[id].[hash:7].js'

config.mode = 'production'
config.devtool = false

config.plugins = (config.plugins || []).concat([
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"',
    },
  }),
  new UglifyJsPlugin(),
  new MiniCssExtractPlugin({
    filename: '[name].[hash:7].css',
    chunkFilename: '[id].[hash:7].css',
  })
])

// Define handler for files with .scss/.css extensions
config.module.rules.push({
  test: /\.scss?$/,
  use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
}, {
  test: /\.css?$/,
  use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
})

module.exports = config