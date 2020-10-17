import axios from 'axios'
import { query, mutation } from 'gql-query-builder'
import cookie from 'js-cookie'

import { routeApi } from '../../../setup/routes'

export const SAVE_STYLE = 'SURVEY/SAVE_STYLE'
export const SURVEY_RESPONSE = 'SURVEY/SURVEY_RESPONSE'

export function sendSurvey(surveyContents) {
  const surveyAsString = JSON.stringify(surveyContents)
  return dispatch => {
    return axios.post(routeApi, mutation({
      operation: 'surveyCreate',
      variables: {surveyContents: surveyAsString},
      fields: ['result']
    }))
      .then(response => {
        let error = ''
        console.log(response)
        if (response.data.errors && response.data.errors.length > 0) {
            error = response.data.errors[0].message
        } else if (response.data.data.surveyCreate && response.data.data.surveyCreate.result !== '') {
          console.log('hit!')
          const surveyResult = response.data.data.surveyCreate.result
          dispatch({
            type: SAVE_STYLE,
            surveyResult
          })
        }
      })
      .catch(error => {
        console.log(error)
        dispatch({
          type: SURVEY_RESPONSE,
          error: 'Please try again'
        })
      })
  }
}