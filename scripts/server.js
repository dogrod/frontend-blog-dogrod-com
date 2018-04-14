const Koa = require('koa')
// const Router = require('koa-router')
const Proxy = require('koa-better-http-proxy')

const serve = require('koa-static')
const send = require('koa-send')
const path = require('path')

const app = new Koa()
// const router = new Router()

const port = parseInt(process.env.PORT) || 9002

app.use(serve(path.join(process.cwd(), 'build')))

// app.use(router.routes())

app.use(async (ctx, next) => {
  await send(path.join(process.cwd(), 'build', 'index.html'))

  await next()
})

app.listen(port, err => {
  if (err) throw err

  console.log(`> Ready on http://localhost:${port}`)
})