import * as actions from './actions'

describe('actions', () => {
  it('should have a type of SET_USER', () => {
    const token = 'ABG7OJMONMO'
    const user = {
      name: 'The User',
      email: 'user@crate.com',
      role: 'USER'
    }
    const expectedAction = {
      type: 'AUTH/SET_USER',
      user: user
    }
    expect(actions.setUser(token, user)).toEqual(expectedAction)
  })
})