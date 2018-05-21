const mockCartService = (emit, data) => {
  const action = {
    fns: {},
    outputs: { [emit]: emit },
    execute: jest.fn(() => {
      action.fns[emit](data)
    }),
    on: (ev, fn) => {
      action.fns[ev] = jest.fn(fn)
      return action
    }
  }

  return action
}

export default mockCartService
