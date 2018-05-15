import { Operation } from '../../../app/Operation'

export class CartService extends Operation {
  private cartRepository

  constructor ({ cartRepository }) {
    super()

    this.cartRepository = cartRepository
    this._setOutputs(['SUCCESS', 'ERROR'])
  }

  async execute () {
    const { SUCCESS, ERROR } = this.outputs

    try {
      const data = await this.cartRepository.getAll()

      this.emit(SUCCESS, data)
    } catch (err) {
      this.emit(ERROR, err)
    }
  }

  _setOutputs (outputs) {
    Operation.setOutputs(outputs)
  }
}
