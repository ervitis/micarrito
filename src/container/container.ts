import { asClass, asFunction, asValue, createContainer, Lifetime } from 'awilix'
import * as config from 'config'
import { Application } from '../app/Application'
import { Server } from '../input_interfaces/http/Server'
import { Router } from '../input_interfaces/http/Router'
import { Logger } from '../infra/logger/Logger'

export class Container {
  private readonly container

  constructor () {
    this.container = createContainer()

    this.container
      .register({
        app: asClass(Application, { lifetime: Lifetime.SINGLETON }),
        server: asClass(Server, { lifetime: Lifetime.SINGLETON }),
        router: asClass(Router, { lifetime: Lifetime.SINGLETON }),
        logger: asClass(Logger, { lifetime: Lifetime.SINGLETON }),
        config: asValue(config)
      })
  }

  resolve (appName: string) {
    this.container.resolve(appName)

    return this.container
  }
}
