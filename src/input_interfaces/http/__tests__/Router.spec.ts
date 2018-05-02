import * as express from 'express'
import * as supertest from 'supertest'
import { Router } from '../Router'

describe('Router', () => {
  let request
  const mockResponse = (req, res) => res.send()

  beforeEach(() => {
    const app = express()
    const router = new Router().router

    router.get('/ping', (req, res) => {
      res.status(200).send({status: 'ok'})
    })

    app.use(router)

    request = supertest(app)
  })

  test('Response to request', done => {
    return request
      .get('/ping')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(err).toBeNull()
        expect(res.body).toMatchObject({status: 'ok'})

        done()
      })
  })

  test('Unkown endpoint', done => {
    request
      .get('/poing')
      .expect(404)
      .end((err, res) => {
        expect(err).toBeNull()

        done()
      })
  })
})
