export class Application {
  private readonly server
  private readonly logger

  constructor ({ server, logger }) {
    this.server = server
    this.logger = logger
  }

  async start () {
    this.logger.info('Starting server')
    this.server.start()
  }
}
