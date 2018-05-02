import * as express from 'express'
import { Server } from '../Server'

describe('Server test', () => {
  const router = express.Router()
  const config = {
    logger: {},
    server: { port: 9876, timeout: 50000 }
  }
  const logger = {
    info: jest.fn()
  }

  test('Constructor', () => {
    const server = new Server(config, logger, router)

    expect(server.app).toBeTruthy()
    expect(logger.info).not.toHaveBeenCalled()
  })

  describe('Server features', () => {
    let server

    beforeEach(async () => {
      server = new Server(config, logger, router)
      await server.start()
    })

    afterEach(() => {
      return server.stop()
    })

    test('Server has started', async () => {
      expect(server.app).toBeTruthy()
      expect(logger.info).toHaveBeenCalledWith(`[p ${process.pid}] Listening at port ${config.server.port}`)
    })
  })
})
