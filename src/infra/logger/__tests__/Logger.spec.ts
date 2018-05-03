import { Logger } from '../Logger'

describe('Logger', () => {
  test('Create logger', () => {
    const config = {
      logger: { level: 'debug' }
    }
    const logger = new Logger(config)

    expect(logger).toBeDefined()
    expect(logger.level).toBe('debug')
  })

  test('Default level', () => {
    const config = {
      logger: {}
    }
    const logger = new Logger(config)

    expect(logger).toBeDefined()
    expect(logger.level).toBe('info')
  })

  test('Format message', () => {
    const config = {
      logger: { level: 'debug' }
    }
    const logger = new Logger(config)
    Date.prototype.toISOString = jest.fn(() => {
      return '123456'
    })

    const format = logger._formatMessage('component', '123', 200, 'hello world')
    expect(format).toMatchObject({ component: 'component', traceid: '123', code: 200, message: 'hello world', timestamp: '123456' })
  })

  test('Write log', () => {
    const config = {
      logger: {}
    }
    const logger = new Logger(config)
    logger.write = jest.fn()
    logger.write('123', '23423', 200, 'hello')
    expect(logger.write).toHaveBeenCalledWith('123', '23423', 200, 'hello')
  })
})
