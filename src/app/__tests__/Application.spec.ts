import * as app from '../Application'

describe('Application test', () => {
  test('instance', () => {
    expect(app).toBeDefined()
  })

  test('Start called', () => {
    const server = {
      start: jest.fn(() => {})
    }
    const logger = {
      info: jest.fn(() => {})
    }
    const myApp = new app.Application(server, logger)
    myApp.start()
    expect(server.start).toHaveBeenCalled()
  })
})
