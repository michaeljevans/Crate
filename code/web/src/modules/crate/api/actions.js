// Imports
import axios from 'axios'
import { query, mutation } from 'gql-query-builder'

// App Imports
import { routeApi } from '../../../setup/routes'

// Actions Types
export const CRATES_GET_LIST_REQUEST = 'CRATES/GET_LIST_REQUEST'
export const CRATES_GET_LIST_RESPONSE = 'CRATES/GET_LIST_RESPONSE'
export const CRATES_GET_LIST_FAILURE = 'CRATES/GET_LIST_FAILURE'
export const CRATES_GET_REQUEST = 'CRATES/GET_REQUEST'
export const CRATES_GET_RESPONSE = 'CRATES/GET_RESPONSE'
export const CRATES_GET_FAILURE = 'CRATES/GET_FAILURE'

// Actions

// Get list of crates
// dispatching action to fetch crates through axios post request
// operation type is query and operation names that will be referenced by backend is 'crates'
// received data should be ordered by ASCENDING order
// default value for orderBy is 'DESC/descending' but we passed in argument of 'ASC' when getList was invoked
// fields dictate the data we want to get back 
export function getList(orderBy = 'DESC', isLoading = true) {
  return dispatch => {
    dispatch({
      type: CRATES_GET_LIST_REQUEST,
      error: null,
      isLoading
    })

    return axios.post(routeApi, query({
      operation: 'crates',
      variables: { orderBy },
      fields: ['id', 'name', 'description', 'createdAt', 'updatedAt']
    }))
      .then(response => {
        if (response.status === 200) {
          // if response if ok then dispatch action which changes the isLoading property to false *** This enables the CrateItems to be rendered ***
          dispatch({
            type: CRATES_GET_LIST_RESPONSE,
            error: null,
            isLoading: false,
            // adds data to store in reducer: action.list === response.data.data.crates
            list: response.data.data.crates
          })
        } else {
          console.error(response)
        }
      })
      .catch(error => {
        // if there is an error with fetch then CRATES_GET_LIST_FAILURE will be dispatched
        dispatch({
          type: CRATES_GET_LIST_FAILURE,
          error: 'Some error occurred. Please try again.',
          isLoading: false
        })
      })
  }
}

// Get single crate
export function get(slug, isLoading = true) {
  return dispatch => {
    dispatch({
      type: CRATES_GET_REQUEST,
      isLoading
    })

    return axios.post(routeApi, query({
      operation: 'crate',
      variables: { slug },
      fields: ['id', 'name', 'slug', 'description', 'image', 'createdAt']
    }))
      .then(response => {
        dispatch({
          type: CRATES_GET_RESPONSE,
          error: null,
          isLoading: false,
          item: response.data.data.crate
        })
      })
      .catch(error => {
        dispatch({
          type: CRATES_GET_FAILURE,
          error: 'Some error occurred. Please try again.',
          isLoading: false
        })
      })
  }
}

// Get single crate by Id
export function getById(crateId) {
  return dispatch => {
    return axios.post(routeApi, query({
      operation: 'crateById',
      variables: { crateId },
      fields: ['id', 'name', 'description']
    }))
  }
}

// Create or update crate
export function createOrUpdate(crate) {
  if (crate.id > 0) {
    return update(crate)
  } else {
    delete crate.id
    return create(crate)
  }
}

// Create crate
export function create(variables) {
  return dispatch => {
    return axios.post(routeApi, mutation({
      operation: 'crateCreate',
      variables,
      fields: ['id']
    }))
  }
}

// Update crate
export function update(crate) {
  return dispatch => {
    return axios.post(routeApi, mutation({
      operation: 'crateUpdate',
      variables: crate,
      fields: ['id']
    }))
  }
}

// Remove crate
export function remove(variables) {
  return dispatch => {
    return axios.post(routeApi, mutation({
      operation: 'crateRemove',
      variables,
      fields: ['id']
    }))
  }
}
