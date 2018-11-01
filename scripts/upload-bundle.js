const paths = require('../config/paths')

require('ts-node').register({
  project: paths.tsConfig,
  files: true
})

require('../server/utils/upload-bundle.ts')