import * as express from 'express'
import { asFunction, asValue, createContainer } from 'awilix'
import { INTERNAL_SERVER_ERROR } from 'http-status-codes'
import * as bodyParser from 'body-parser'
import { controller, scopePerRequest } from 'awilix-express'
import CartController from '../CartController'
import mockCartService from './__mocks__/mockCartService'
import * as request from 'supertest'

describe('CartController', () => {
  let app, container
  let logger

  beforeEach(() => {
    app = express()
    container = createContainer()

    app
      .use(bodyParser.json())
      .use(scopePerRequest(container))
      .use(controller(CartController))

    container.register({
      cartService: asValue({})
    })

    logger = {
      info: jest.fn(() => {}),
      error: jest.fn(() => {})
    }
  })

  afterEach(() => {
    app = null
  })

  test('Get all items', done => {
    const someItems = [
      { id: 1, productName: 'Knife', quantity: 2, price: 20.20 },
      { id: 2, productName: 'Spoon', quantity: 1, price: 15.0 }
    ]

    const cartService = {
      execute: jest.fn(() => someItems)
    }

    container.register({
      cartService: asValue(cartService),
      logger: asValue(logger)
    })

    request(app)
      .get('/cart/items')
      .expect(200)
      .end((err, res) => {
        expect(err).toBeFalsy()
        const { items } = res.body
        expect(items).toMatchSnapshot()

        done()
      })
  })

  test('Handle error', done => {
    const cartService = {
      execute: jest.fn(() => {
        throw Error('ups')
      })
    }
    container.register({
      cartService: asValue(cartService),
      logger: asValue(logger)
    })

    request(app)
      .get('/cart/items')
      .expect(INTERNAL_SERVER_ERROR)
      .end((err, res) => {
        expect(res).toBeTruthy()
        expect(res.body).toMatchSnapshot()
        done()
      })
  })
})
