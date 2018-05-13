const { spawn } = require('child_process')

const webpackServe = require('./webpack-serve')

process.env.NODE_ENV = 'development'

webpackServe()
  .then(() => {
    spawn(
      './node_modules/.bin/nodemon',
      ['server/index.js'],
      {
        stdio: 'inherit',
        shell: true,
      }
    )
  })