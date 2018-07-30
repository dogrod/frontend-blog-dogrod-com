require('ts-node').register({
  project: require('path').join(__dirname, '../server/tsconfig.json')
})

require('../server/utils/upload-bundle.ts')