import { get } from 'lodash'
import * as winston from 'winston'

const logger = ({ config }) => {
  return new winston.Logger({
    levels: { error: 0, warn: 1, info: 2, debug: 3 },
    level: get(config, 'logger.level', 'info'),
    transports: [
      new winston.transports.Console({
        json: get(config, 'logger.json', false),
        colorize: false,
        stringify: (obj) => JSON.stringify(obj),
        timestamp: new Date().toISOString(),
        handleExceptions: true,
        humanReadableUnhandledException: true
      })
    ],
    exitOnError: false
  })

}

export default logger
