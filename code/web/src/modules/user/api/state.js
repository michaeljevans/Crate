// App Imports
import { isEmpty } from '../../../setup/helpers'
import { SET_USER, LOGIN_REQUEST, LOGIN_RESPONSE, LOGOUT } from './actions'
import { SAVE_STYLE } from '../../style/api/actions'

// Initial State
export const userInitialState = {
  error: null,
  isLoading: false,
  isAuthenticated: false,
  details: null
}

// State
export default (state = userInitialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.user),
        details: action.user,
        // temporary property, to be deleted when this property is added to the back end: 
        style: null
      }

    case LOGIN_REQUEST:
      return {
        ...state,
        error: null,
        isLoading: action.isLoading
      }

    case LOGIN_RESPONSE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }

    case LOGOUT:
      return {
        ...state,
        error: null,
        isLoading: false,
        isAuthenticated: false,
        details: null
      }
    
    case SAVE_STYLE: 
      newDetails = state.user.details
      newDetails.style = action.surveyResult
      return {
        ...state,
        isLoading: false,
        details: newDetails
      }
    
    case SURVEY_RESPONSE: 
      return {
        ...state,
        error: action.error
      }

    default:
      return state
  }
}