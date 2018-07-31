import * as winston from 'winston'
import { IS_DEV } from './env'

const createWinstonInstance = (namespace: string) => {
  const transports: any[] = [
    new winston.transports.Console({
      colorize: true,
      label: namespace,
    }),
  ]

  if (!IS_DEV) {
    transports.push(
      new winston.transports.File({
        name: 'info-file',
        filename: 'winston-info.log',
        level: 'info'
      })
    )
  }

  return new winston.Logger({
    transports,
  })
}

export default (namespace: string) => {
  const logger = createWinstonInstance(namespace)
  return logger
}