import { rootReducer } from '../../../setup/store'
import { initialState } from '../../../setup/store'

describe('User Reducer', () => {

  it('Should return the initial state for user', () => {
    expect(rootReducer(undefined, {})).toMatchSnapshot()
  })

  it('Should handle a login request', () => {
    expect(
      rootReducer(initialState,
        {
          type: 'AUTH/LOGIN_REQUEST',
          isLoading: true
        }
      )
    ).toMatchSnapshot()
  })

  it('Should set a new user', () => {
    expect(
      rootReducer(initialState,
        {
          type: 'AUTH/SET_USER',
          user: {
            email: 'user@crate.com',
            name: 'The User',
            role: 'USER'
          }
        }
      )
    ).toMatchSnapshot()
  })

  it('Should handle a login response', () => {
    expect(
      rootReducer(initialState,
        {
          type: 'AUTH/LOGIN_RESPONSE',
          isLoading: false
        }
      )
    ).toMatchSnapshot()
  })
})