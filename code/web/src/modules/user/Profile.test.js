import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Profile from './Profile'
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Profile Component', () => {

  it('Should render the expected UI if user hasn\'t taken the style survey', () => {
    const user = {
      isAuthenticated: true,
      details: {
        name: 'The User',
        email: 'user@crate.com',
        role: 'USER',
        style: null
      }
    }

    const store = mockStore({
      user: user
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Profile
            user={user}
          />
        </MemoryRouter>
      </Provider>
    )

    const pageHeading = screen.getByText('My profile')
    const userEmail = screen.getByText('user@crate.com')
    const subscriptionButton = screen.getByRole('button', { name: 'Subscriptions' })
    const logoutButton  = screen.getByRole('button', { name: 'Logout' })
    const style = screen.queryByText('Your Style', { exact: false })
   
    expect(pageHeading).toBeInTheDocument();
    expect(userEmail).toBeInTheDocument();
    expect(subscriptionButton).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
    expect(style).not.toBeInTheDocument();
  })

  it('Should render the expected UI if user has taken the style survey', () => {
    const user = {
      isAuthenticated: true,
      details: {
        name: 'The User',
        email: 'user@crate.com',
        role: 'USER',
        style: 'Classic but bold'
      }
    }

    const store = mockStore({
      user: user
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Profile
            user={user}
          />
        </MemoryRouter>
      </Provider>
    )

    const pageHeading = screen.getByText('My profile')
    const userEmail = screen.getByText('user@crate.com')
    const subscriptionButton = screen.getByRole('button', { name: 'Subscriptions' })
    const logoutButton = screen.getByRole('button', { name: 'Logout' })
    const style = screen.getByText('Your Style: Classic but bold')

    expect(pageHeading).toBeInTheDocument();
    expect(userEmail).toBeInTheDocument();
    expect(subscriptionButton).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
    expect(style).toBeInTheDocument();
  })
})
