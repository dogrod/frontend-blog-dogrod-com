import * as fs from 'fs'
import * as path from 'path'
import * as Upyun from 'upyun'

import Logger from './logger'

const logger = Logger('upyun')

const defaultOptions = {
  localPath: 'dist',
  remotePathPrefix: '/',
  ignore: ['.DS_Store'],
}

const config: any = require(path.resolve(fs.realpathSync(process.cwd()), 'upyun.config.js'))

const options = Object.assign({}, defaultOptions, config)

const { service, operator, password } = options

// Init Upyun instance
const upyunService = new Upyun.Service(service, operator, password)
const upyunClient = new Upyun.Client(upyunService)

const recursivePath = (dir: string, callback: (localPath: string) => void) => {
  logger.debug(`Recursive path @ ${dir}`)

  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file)
    if (options.ignore.includes(file)) {
      logger.info(`Ignored path: ${filePath}`)
      return
    }
    if (fs.statSync(filePath).isDirectory()) {
      recursivePath(filePath, callback)
    } else {
      callback(filePath)
    }
  })
}

const upload = async (localPath: string) => {
  const file = fs.readFileSync(localPath)

  // Remove bundle dir
  const subPaths = localPath.split('/').slice(1)
  const remotePath = path.join(options.remotePathPrefix, ...subPaths)

  try {
    const res: boolean | object = upyunClient.putFile(remotePath, file)
    
    if (!res) {
      throw new Error(`Upload to upyun failed: ${localPath} ===> ${remotePath}`)
    }
    
    logger.info(`√ Uploaded. Detail: ${localPath} ===> ${remotePath}`)
  } catch (error) {
    logger.error(error.message)
  }
}

recursivePath(options.localPath, upload)