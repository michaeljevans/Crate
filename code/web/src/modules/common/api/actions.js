// Actions Types
import axios from 'axios/index'
import { routeApi } from '../../../setup/routes'

export const MESSAGE_SHOW = 'COMMON_MESSAGE_SHOW'
export const MESSAGE_HIDE = 'COMMON_MESSAGE_HIDE'
// these variables are used to correspond types in other documents. Why not just use the type directly?

// Actions
export function messageShow(message) {
  // messages are passed in as strings
  return { type: MESSAGE_SHOW, message }
}

//interesting - some reducers without payloads

export function messageHide() {
  return { type: MESSAGE_HIDE }
}

export function upload(data) {
  return dispatch => {
    return axios.post(routeApi + '/upload', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
        // ooo a new content type, huh?
      }
    })
  }
}

