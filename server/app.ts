import * as Koa from 'koa'
import * as koaLogger from 'koa-logger'

const paths = require('../config/paths.js')
const appConfig = require(paths.appConfig)

const port = parseInt(appConfig.port, 10) || 9001

const app = new Koa()

app.use(koaLogger())

app.listen(port, () => {
  console.log(`App running at port ${port}`)
})
