require('ts-node').register({
  project: require('path').join(__dirname, './tsconfig.json'),
  files: true
})
require('./app.ts')