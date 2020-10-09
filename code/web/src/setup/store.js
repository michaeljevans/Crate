// Imports
import { compose, combineReducers } from 'redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

// App Imports
import common from '../modules/common/api/state'
import user from '../modules/user/api/state'
import * as product from '../modules/product/api/state'
import * as subscription from '../modules/subscription/api/state'
import * as crate from '../modules/crate/api/state'

// The combineReducers helper function turns an object whose values are different reducing functions into a single reducing function you can pass to createStore.


// App Reducer

// the combineReducers function turns the passed in reducing functions into a single reducing function. This single reducing function can be accessed by calling appReducer 

const appReducer = combineReducers({
  common,
  user,
  ...product,
  ...subscription,
  ...crate
})

// Root Reducer
// using an if statement to determine the value(?)/ what's returned(?) in the rootReducer
// if the action type is not 'RESET' then the rootReducer will invoke the appReducer function
// if the action is 'RESET' then the rootReducer will assign the value of state as undefined

export const rootReducer = (state, action) => {
  if (action.type === 'RESET') {
    state = undefined
  }

  return appReducer(state, action)
}

// Assigning a value to initial state if window is not undefined
// window._INITIAL_STATE_ is assigned value of "JSON.stringify(initialState)" in view.js, where initialState's default value is an empty object 
// then uses the delete keyword to delete the window.__INITIAL_STATE__ object
let initialState
if (typeof window !== 'undefined') {
  initialState = window.__INITIAL_STATE__
  console.log('initial state', initialState)
  delete window.__INITIAL_STATE__
}

// Store
export const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(thunk),
  )
) 