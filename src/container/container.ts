import { asClass, asFunction, asValue, createContainer, Lifetime } from 'awilix'
import * as config from 'config'
import { Application } from '../app/Application'

export class Container {
  private readonly container

  constructor () {
    this.container = createContainer()

    this.container.register({
      app: asClass(Application, {lifetime: Lifetime.SINGLETON}),
      //server: asClass(Server, {lifetime: Lifetime.SINGLETON}),
      //router: asFunction(router, {lifetime: Lifetime.SINGLETON}),
      //logger: asFunction(logger, {lifetime: Lifetime.SINGLETON}),
      config: asValue(config)
    })
  }

  resolve (appName: string) {
    this.container.resolve(appName)

    return this.container
  }
}
