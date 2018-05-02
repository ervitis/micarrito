import { createServer } from 'http'
import * as terminus from '@godaddy/terminus'
import * as express from 'express'

export class Server {
  public readonly app
  private readonly server

  constructor (private config, private logger, private router) {
    this.app = express()

    this.app.disable('x-powered-by')
    this.app.use(this.router)

    this.server = terminus(createServer(this.app), {
      timeout: this.config.server.timeout,
      signal: 'SIGINT',
      healthChecks: {
        '/_health/liveness': () => Promise.resolve(),
        '/_health/probeness': () => Promise.resolve()
      },
      logger: this.logger.info
    })
  }

  start () {
    return new Promise(resolve => {
      this.server.listen(this.config.server.port, () => {
        this.logger.info(`[p ${process.pid}] Listening at port ${this.config.server.port}`)
        resolve()
      })
    })
  }

  stop () {
    return this.server.close()
  }
}
