const Koa = require('koa')
const Router = require('koa-router')
const proxy = require('koa-better-http-proxy')

const serve = require('koa-static')
const send = require('koa-send')
const path = require('path')
const koaLogger = require('koa-logger')

const serverConfig = require(path.join(process.cwd(), 'server.config.js'))

const app = new Koa()
const router = new Router()

const port = parseInt(serverConfig.port, 10) || 9002

app.use(koaLogger())

app.use(serve(path.join(process.cwd(), 'build')))

router.get('*', async (ctx, next) => {
  // 如果请求头中含有json请求，则简单判定为非前端页面请求，直接跳过
  if (
    ctx.header.accept
    && ctx.header.accept.indexOf('application/json') > -1
  ) {
    return await next()
  }

  await send(ctx, path.join(process.cwd(), 'build', 'index.html'))
})

app.use(router.routes())

app.use(proxy(serverConfig.proxy['/api']))

app.listen(port, err => {
  if (err) throw err

  console.log(`> Ready on http://localhost:${port}`)
})