import { get } from 'lodash'
import * as winston from 'winston'

const logger = ({ config }) => {
  return new winston.Logger({
    levels: { error: 0, warn: 1, info: 2, debug: 3 },
    level: get(config, 'logger.level', 'info'),
    transports: [
      new winston.transports.Console({
        json: true,
        colorize: false,
        stringify: (obj) => JSON.stringify(obj),
        timestamp: new Date().toISOString(),
        handleExceptions: true,
        humanReadableUnhandledException: true
      })
    ],
    exitOnError: false
  })

    /*
  _formatMessage (component: string, traceid: string, code: number, message: string) {
      return {
        component: component,
        traceid: traceid,
        code: code,
        message: message,
        timestamp: new Date().toISOString()
      }
    }
    */
}

export default logger
