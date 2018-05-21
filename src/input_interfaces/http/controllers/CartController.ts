import { createController } from 'awilix-express'
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from 'http-status-codes'

class CartController {
  private cartService
  private logger

  constructor ({ cartService, logger }) {
    this.cartService = cartService
    this.logger = logger
  }

  async getAll (req, res) {
    try {
      const items = await this.cartService.execute()
      res.status(OK).send({items: items})
    } catch (err) {
      this.logger.error(err)
      res.status(INTERNAL_SERVER_ERROR).send({ error: 'Error retrieving items from carts' })
    }
  }
}

export default createController(CartController)
  .prefix('/cart')
  .get('/items', 'getAll')
