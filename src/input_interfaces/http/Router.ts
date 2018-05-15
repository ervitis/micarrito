import * as express from 'express'
import * as bodyParser from 'body-parser'
import { loadControllers } from 'awilix-express'

const router = ({ errorMiddleware, containerMiddleware }) => {
  const router = express.Router()
  const apiRouter = express.Router()

  apiRouter
    .use(containerMiddleware)
    .use(errorMiddleware)
    .use(loadControllers('controllers/**/*Controller.js', { cwd: __dirname }))

  router
    .use(bodyParser.json())
    .use('/api', apiRouter)

  return router
}

export default router
