import { createController } from 'awilix-express'
import { OK, INTERNAL_SERVER_ERROR } from 'http-status-codes'

class CartController {
  private cartService

  constructor ({cartService}) {
    this.cartService = cartService
  }

  getAll (req, res) {
    const {SUCCESS, ERROR} = this.cartService.outputs

    this.cartService
      .on(ERROR, err => {
        res.sendInternalServerError(`Can't get the items from cart`)
      })
      .on(SUCCESS, items => {
        res.json({items: items})
      }).execute()
  }
}

export default createController(CartController)
  .prefix('/cart')
  .get('/items', 'getAll')
