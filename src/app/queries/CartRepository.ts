export class CartRepository {
  constructor () {}

  async getAll () {
    return [
      { id: 1, productName: 'Spoon', quantity: 1, price: 10.00 },
      { id: 2, productName: 'Knife', quantity: 2, price: 5.00 },
      { id: 3, productName: 'Fork', quantity: 4, price: 12.00 },
    ]
  }
}
