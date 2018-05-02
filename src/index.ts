import { Container } from './container/container'

const app = new Container().resolve('app')

app
  .start()
  .catch(err => {
    app.logger.error(err.stack)
    process.exit()
  })
