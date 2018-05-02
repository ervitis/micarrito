export class Application {
  constructor (private server, private logger) {
    this.server = server
    this.logger = logger
  }

  async start () {
    this.logger.info('Starting server')
    this.server.start()
  }
}
