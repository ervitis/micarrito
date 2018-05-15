import { INTERNAL_SERVER_ERROR } from 'http-status-codes'
import * as createHttpError from 'http-errors'

export default function errorMiddleware () {
  return (req, res, next) => {
    res.sendError = ({ code, message, cause, ...args}) => {
      return next(createHttpError(code, message, { cause, ...args }))
    }

    res.sendInternalServerError = message => cause => {
      return next(createHttpError(INTERNAL_SERVER_ERROR, message, { cause }))
    }

    return next()
  }
}
