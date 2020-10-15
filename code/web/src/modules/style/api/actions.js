import axios from 'axios'
import { query, mutation } from 'gql-query-builder'
import cookie from 'js-cookie'

import { routeApi } from '../../../setup/routes'

export const SAVE_STYLE = 'SURVEY/SAVE_STYLE'
export const SURVEY_RESPONSE = 'SURVEY/SURVEY_RESPONSE'

export function sendSurvey(surveyContents) {

  return axios.post(routeApi, mutation({
    operation: 'postSurvey',
    variables: surveyContents,
    fields: ['result']
  }))
    .then(response => {
      let error = ''

      if (response.data.errors && response.data.errors.length > 0) {
          error = response.data.errors[0].message
      } else if (response.data.data.result !== '') {
        const surveyResult = response.data.data.result
        dispatch({
          type: SAVE_STYLE,
          surveyResult
        })
      }
    })
    .catch(error => {
      dispatch({
        type: SURVEY_RESPONSE,
        error: 'Please try again'
      })
    })
}