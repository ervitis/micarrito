import * as express from 'express'
import * as bodyParser from 'body-parser'
import { loadControllers } from 'awilix-express'

export class Router {
  public readonly router
  private readonly apiRouter

  constructor () {
    this.router = express.Router()
    this.apiRouter = express.Router()

    this.apiRouter
      .use(loadControllers('controllers/**/*Controller.js', { cwd: __dirname }))

    this.router
      .use(bodyParser.json())
      .use('/api', this.apiRouter)
  }
}
