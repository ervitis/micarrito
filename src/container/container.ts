import { asClass, asFunction, asValue, createContainer, Lifetime } from 'awilix'
import * as config from 'config'
import { Application } from '../app/Application'
import { Server } from '../input_interfaces/http/Server'
import logger from '../infra/logger/Logger'
import router from '../input_interfaces/http/Router'
import { CartService } from '../input_interfaces/http/services/CartService'
import { scopePerRequest } from 'awilix-express'
import { CartRepository } from '../app/queries/CartRepository'
import errorMiddleware from '../input_interfaces/middlewares/ErrorMiddleware'
import errorHandler from '../input_interfaces/middlewares/ErrorHandler'

export class Container {
  private readonly container

  constructor () {
    this.container = createContainer()

    this.container
      .register({
        app: asClass(Application, { lifetime: Lifetime.SINGLETON }),
        server: asClass(Server, { lifetime: Lifetime.SINGLETON }),
        router: asFunction(router, { lifetime: Lifetime.SINGLETON }),
        logger: asFunction(logger, { lifetime: Lifetime.SINGLETON })
      })
      .register({
        cartService: asClass(CartService, { lifetime: Lifetime.SINGLETON }),
        cartRepository: asClass(CartRepository, { lifetime: Lifetime.SCOPED }),
        errorMiddleware: asFunction(errorMiddleware, { lifetime: Lifetime.SINGLETON }),
        errorHandler: asFunction(errorHandler, { lifetime: Lifetime.SINGLETON })
      })

    this.container
      .register({
        config: asValue(config),
        containerMiddleware: asValue(scopePerRequest(this.container))
      })
  }

  resolve (appName: string) {
    return this.container.resolve(appName)
  }
}
