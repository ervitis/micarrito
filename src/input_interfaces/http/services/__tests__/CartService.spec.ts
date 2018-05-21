import { CartService } from '../CartService'

describe('CartService', () => {
  const cartRepository = {
    repositoryGetAllItems: jest.fn(() => Promise.resolve([{id: 1, name: 'hello'}]))
  }

  test('Instance', () => {
    const cartService = new CartService({ cartRepository })
    expect(cartService).toBeDefined()
  })

  test('Get all items', async () => {
    const cartService = new CartService({ cartRepository })
    const data = await cartService.execute()

    expect(data).toBeDefined()
    expect(data).toMatchSnapshot()
    expect(data.length).toBe(1)
  })
})
