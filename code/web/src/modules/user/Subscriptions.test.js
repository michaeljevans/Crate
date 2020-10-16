import React from 'react';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import '@testing-library/jest-dom'
import thunk from 'redux-thunk';
import Subscriptions from './Subscriptions.js'
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { subscription } from 'gql-query-builder';
import { getListByUser } from '../subscription/api/actions.js';
jest.mock('axios')
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Subscriptions Component', () => {
  let user;
  let subscriptions;
  beforeEach(() => {
    user = {
      isAuthenticated: true,
      details: {
        name: 'The User',
        email: 'user@crate.com',
        role: 'USER'
      },
      style: null
    }

    subscriptions = {}
  })

  it.skip('Should render the users subscriptions', () => {
    subscriptions = {
      isLoading: false,
        error: null,
          list: []
    }

    axios.post.mockImplementationOnce(() => { 
      Promise.resolve(subscriptions)
    })

  let store = mockStore({
    user: user,
    subscriptions: subscriptions
  });
    
    store.dispatch = jest.fn()

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Subscriptions
            user={user}
            subscriptions={subscriptions}
            getListByUser={jest.fn()}
          />
        </MemoryRouter>
      </Provider>
    )

    const heading = screen.getByText('My subscriptions')
    expect(heading).toBeInTheDocument();

  })
})

