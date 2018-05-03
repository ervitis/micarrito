import { get } from 'lodash'
import * as winston from 'winston'

export class Logger {
  public readonly level
  private readonly logger

  constructor (private config) {
    this.level = get(config, 'logger.level', 'info')
    const isJsonOutput = get(config, 'logger.format') === 'json'

    this.logger = new winston.Logger({
      transports: [
        new winston.transports.Console({
          json: isJsonOutput,
          colorize: !isJsonOutput,
          handleExceptions: true,
          humanReadableUnhandledException: true,
          level: this.level
        })
      ]
    })
  }

  _formatMessage (component: string, traceid: string, code: number, message: string) {
    return {
      component: component,
      traceid: traceid,
      code: code,
      message: message,
      timestamp: new Date().toISOString()
    }
  }

  write (component: string, traceid: string, code: number, message: string) {
    this.logger.log({
      message: this._formatMessage(component, traceid, code, message)
    })
  }
}
