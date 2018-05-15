import * as express from 'express'
import { asValue, createContainer } from 'awilix'
import { INTERNAL_SERVER_ERROR } from 'http-status-codes'
import * as bodyParser from 'body-parser'
import { controller, scopePerRequest } from 'awilix-express'
import CartController from '../CartController'
import mockCartService from './__mocks__/mockCartService'
import * as request from 'supertest'

describe('CartController', () => {
  let app, container

  beforeEach(() => {
    app = express()
    container = createContainer()

    app.use((req, res, next) => {
      res.sendInternalServerError = (msg) => () => res.status(INTERNAL_SERVER_ERROR).send(msg)
      res.sendError = (err) => res.status(err.code).send()

      return next()
    })
    app
      .use(bodyParser.json())
      .use(scopePerRequest(container))
      .use(controller(CartController))

    container.register({
      cartService: asValue({})
    })
  })

  afterEach(() => {
    app = null
  })

  test('Get all items', done => {
    const items = [
      { id: 1, productName: 'Knife', quantity: 2, price: 20.20 },
      { id: 2, productName: 'Spoon', quantity: 1, price: 15.0 }
    ]
    const operation = mockCartService('SUCCESS', items)
    container.register({
      cartService: asValue(operation)
    })

    request(app)
      .get('/cart/items')
      .expect(200)
      .end((err, res) => {
        expect(err).toBeFalsy()
        expect(operation.execute).toHaveBeenCalled()
        expect(operation.fns['SUCCESS']).toHaveBeenCalledWith(items)

        done()
      })
  })

  test('Handle error', done => {
    const operation = mockCartService('ERROR', { err: 'Something went wrong' })
    container.register({
      cartService: asValue(operation)
    })

    request(app)
      .get('/cart/items')
      .expect(INTERNAL_SERVER_ERROR)
      .end((err, res) => {
        expect(err).toBeTruthy()
        expect(operation.execute).toHaveBeenCalled()
        expect(operation.fns['ERROR']).toHaveBeenCalled()

        done()
      })
  })
})
