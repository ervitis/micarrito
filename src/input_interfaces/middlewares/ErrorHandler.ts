import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from 'http-status-codes'
import { get } from 'lodash'

const errorHandlers = {
  formatError: (status, err) => {
    return {
      code: status,
      date: new Date().toISOString(),
      message: err.message,
      trace: status >= 500 ? err.stack.split('\n') : null,
      details: err.hasOwnProperty('details') && (err.details !== null || err.details !== undefined) ? err.details : null
    }
  },

  formatValidationError: (err) => {
    return {
      code: BAD_REQUEST,
      date: new Date().toISOString(),
      message: `Validation error on: ${err.details.map(({ path }) => path.join('')).join(', ')}`,
      trace: err.stack.split('\n'),
      details: err.details.map(({ message, path }) => ({ message, path }))
    }
  },

  isValidationError: (err) => {
    return get(err, 'error.isJoi')
  }
}

export default function errorHandler ({ logger }) {
  return (err, req, res, next) => {
    if (errorHandlers.isValidationError(err)) {
      const errInfo = errorHandlers.formatValidationError(err.error)
      return res.status(BAD_REQUEST).json(errInfo)
    } else {
      const status = err.status || INTERNAL_SERVER_ERROR
      const errInfo = errorHandlers.formatError(status, err)

      logger.error(err, err.cause)

      return res.status(status).json(errInfo)
    }
  }
}
