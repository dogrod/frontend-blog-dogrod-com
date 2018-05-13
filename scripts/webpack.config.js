// Return webpack config file
const paths = require('../config/paths')
const { isDev } = require(paths.env)

const configPath = isDev ? paths.webpackDevConfig : paths.webpackProdConfig
const config = require(configPath)

module.exports = config