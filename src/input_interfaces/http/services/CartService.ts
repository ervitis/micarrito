
export class CartService {
  private cartRepository

  constructor ({ cartRepository }) {
    this.cartRepository = cartRepository
  }

  async execute () {
    try {
      const data = await this.cartRepository.repositoryGetAllItems()
      return data
    } catch (err) {
      throw err
    }

  }
}
