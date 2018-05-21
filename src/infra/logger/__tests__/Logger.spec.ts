import logger from '../Logger'

describe('Logger', () => {
  test('Create logger', () => {
    const config = {
      logger: { level: 'debug' }
    }
    const mylogger = logger({ config })

    expect(mylogger).toBeDefined()
    expect(mylogger.level).toBe('debug')
  })

  test('Default level', () => {
    const config = {
      logger: {}
    }
    const mylogger = logger({ config })

    expect(mylogger).toBeDefined()
    expect(mylogger.level).toBe('info')
  })
})
