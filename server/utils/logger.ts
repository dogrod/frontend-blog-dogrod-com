import * as winston from 'winston'

const createWinstonInstance = (namespace: string) => {
  return new winston.Logger({
    transports: [
      new winston.transports.Console({
          colorize: true,
          label: namespace,
      })
    ]
  })
}

export default (namespace: string) => {
  const logger = createWinstonInstance(namespace)
  return logger
}