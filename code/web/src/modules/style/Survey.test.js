import React from 'react'
import { Provider } from 'react-redux' 
import { MemoryRouter } from 'react-router-dom'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import '@testing-library/jest-dom'
import { screen, render, fireEvent } from '@testing-library/react'

const mockStore = configureMockStore([thunk])

import Survey from './Survey'

describe('Survey component', () => {
  let store

  beforeEach(() => {
    store = mockStore({
      user: {
        style: null
      }     
    })

    store.dispatch = jest.fn() 

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Survey />
        </MemoryRouter>
      </Provider>    
    )
  })

  it('should have images', () => {
    const images = screen.getAllByAltText('the third best t-shirt')
    expect(images.length > 0).toEqual(true)
  })

  it('should display a message if user tries to submit incomplete', () => {
    const submit = screen.getByRole('button', {name: 'Submit'})
    fireEvent.click(submit)
    expect(store.distpatch).toHaveBeenCalled()
  })
})