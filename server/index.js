const paths = require('../config/paths')

require('ts-node').register({
  project: paths.tsConfig,
  files: true
})
require('./app.ts')