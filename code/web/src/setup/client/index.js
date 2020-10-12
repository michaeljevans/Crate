// Imports
import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

// App Imports
import { store } from '../../setup/store'
import { setUser, loginSetUserLocalStorageAndCookie } from '../../modules/user/api/actions'
import ScrollToTop from '../../modules/common/ScrollToTop'
import App from './App'

// User Authentication
// if user logs in there is a token to get from local storage? YES!!
// In addition to a users details, a token is returned from the resolver method (login) on the backend. 
// When a user logs in successfully the token and user are added to local storage
const token = window.localStorage.getItem('token')
if (token && token !== 'undefined' && token !== '') {
  // console.log('Token:', token)
  const user = JSON.parse(window.localStorage.getItem('user'))
  if (user) {
    // Dispatch action through setUser method(?) 
    // setUser returns SET_USER action with payload of the user object, which adds the user to store
    // is this how a user remains logged in even if they close the window?
    store.dispatch(setUser(token, user))
    // console.log('User:', user)

    loginSetUserLocalStorageAndCookie(token, user)
  }
}

// Client App
// wrapping the APP with <Provider > connects the APP to Redux store
const Client = () => (
  <Provider store={store} key="provider">
    <Router>
      <ScrollToTop>
        <App/>
      </ScrollToTop>
    </Router>
  </Provider>
)

// Mount client app
/* when window loads, render this code inside the 'app' html element */
window.onload = () => {
  hydrate(
    <Client/>,
    document.getElementById('app')
  )
}
