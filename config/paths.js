const fs = require('fs')
const path = require('path')

const appDirectory = fs.realpathSync(process.cwd())

const resolveAppPath = relativePath => path.resolve(appDirectory, relativePath)

module.exports = {
  babelConfig: resolveAppPath('config/babel.config.js'),
  webpackBaseConfig: resolveAppPath('config/webpack.config.base.js'),
  favicon: resolveAppPath('favicon.ico'),
  htmlTemplate: resolveAppPath('index.template.ejs'),
  clientSrc: resolveAppPath('client'),
  clientTsConfig: resolveAppPath('client/tsconfig.json'),
  serverSrc: resolveAppPath('server'),
  serverTsConfig: resolveAppPath('server/tsconfig.json'),
  appConfig: resolveAppPath('app.config.js'),
}