// Imports
import axios from 'axios'
import { query, mutation } from 'gql-query-builder'

// App Imports
import { routeApi } from '../../../setup/routes'

// Actions Types
export const SUBSCRIPTIONS_GET_LIST_REQUEST = 'SUBSCRIPTIONS/GET_LIST_REQUEST'
export const SUBSCRIPTIONS_GET_LIST_RESPONSE = 'SUBSCRIPTIONS/GET_LIST_RESPONSE'
export const SUBSCRIPTIONS_GET_LIST_FAILURE = 'SUBSCRIPTIONS/GET_LIST_FAILURE'
export const SUBSCRIPTIONS_GET_LIST_BY_USER_REQUEST = 'SUBSCRIPTIONS/GET_LIST_BY_USER_REQUEST'
export const SUBSCRIPTIONS_GET_LIST_BY_USER_RESPONSE = 'SUBSCRIPTIONS/GET_LIST_BY_USER_RESPONSE'
export const SUBSCRIPTIONS_GET_LIST_BY_USER_FAILURE = 'SUBSCRIPTIONS/GET_LIST_BY_USER_FAILURE'
export const SUBSCRIPTIONS_GET_REQUEST = 'SUBSCRIPTIONS/GET_REQUEST'
export const SUBSCRIPTIONS_GET_RESPONSE = 'SUBSCRIPTIONS/GET_RESPONSE'
export const SUBSCRIPTIONS_GET_FAILURE = 'SUBSCRIPTIONS/GET_FAILURE'

// Actions

// Get list of subscriptions
export function getList(isLoading = true) {
  return dispatch => {
    dispatch({
      type: SUBSCRIPTIONS_GET_LIST_REQUEST,
      error: null,
      isLoading
    })
    //This query is found at 'api/src/modules/subscription/query.js/line#9'
    return axios.post(routeApi, query({
      operation: 'subscriptions',
      fields: ['id', 'user { name, email }', 'crate { id, name, description }', 'createdAt']
    }))
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: SUBSCRIPTIONS_GET_LIST_RESPONSE,
            error: null,
            isLoading: false,
            list: response.data.data.subscriptions
          })
        } else {
          console.error(response)
        }
      })
      .catch(error => {
        dispatch({
          type: SUBSCRIPTIONS_GET_LIST_FAILURE,
          error: 'Some error occurred. Please try again.',
          isLoading: false
        })
      })
  }
}


// Get list of subscriptions by user
export function getListByUser(isLoading = true) {
  return dispatch => {
    dispatch({
      type: SUBSCRIPTIONS_GET_LIST_BY_USER_REQUEST,
      error: null,
      isLoading
    })
    // This query is found at 'api/src/modules/subscriptions/query.js/line#15'
    return axios.post(routeApi, query({
      operation: 'subscriptionsByUser',
      fields: ['id', 'user { name, email }', 'crate { id, name, description }', 'createdAt']
    }))
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: SUBSCRIPTIONS_GET_LIST_BY_USER_RESPONSE,
            error: null,
            isLoading: false,
            list: response.data.data.subscriptionsByUser
          })
        } else {
          console.error(response)
        }
      })
      .catch(error => {
        dispatch({
          type: SUBSCRIPTIONS_GET_LIST_BY_USER_FAILURE,
          error: 'Some error occurred. Please try again.',
          isLoading: false
        })
      })
  }
}

// Get single subscription
export function get(slug, isLoading = true) {
  return dispatch => {
    dispatch({
      type: SUBSCRIPTIONS_GET_REQUEST,
      isLoading
    })
    // This query is found at 'api/src/modules/subscription/query.js/line#21'
    // ? It is strange that it shows variable of 'slug' when query.js method uses an 'id' as the argument?
    return axios.post(routeApi, query({
      operation: 'subscription',
      variables: { slug },
      fields: ['id', 'user { name, email }', 'crate { id, name, description }', 'createdAt']
    }))
      .then(response => {
        dispatch({
          type: SUBSCRIPTIONS_GET_RESPONSE,
          error: null,
          isLoading: false,
          item: response.data.data.subscription
        })
      })
      .catch(error => {
        dispatch({
          type: SUBSCRIPTIONS_GET_FAILURE,
          error: 'Some error occurred. Please try again.',
          isLoading: false
        })
      })
  }
}

// Create subscription
//This mutation is found in 'api/scr/modules/subscription/mutations.js/line#9'
export function create(variables) {
  return dispatch => {
    return axios.post(routeApi, mutation({
      operation: 'subscriptionCreate',
      variables,
      fields: ['id']
    }))
  }
}

// Remove subscription
//This mutation is found in 'api/scr/modules/subscription/mutations.js/line#21'
export function remove(variables) {
  return dispatch => {
    return axios.post(routeApi, mutation({
      operation: 'subscriptionRemove',
      variables,
      fields: ['id']
    }))
  }
}
