// Imports
import { GraphQLString, GraphQLInt } from 'graphql'

// App Imports
import SurveyType from './types'
import { create } from './resolvers'

// Create
export const surveyCreate = {
  type: SurveyType,
  args: {
    surveyContents: {
      name: 'surveyContents',
      type: GraphQLString
    }
  },
  resolve: create
}
