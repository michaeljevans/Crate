// Imports
import { GraphQLString, GraphQLInt, GraphQLList } from 'graphql'

// App Imports
import SurveyType from './types'
import { getAll } from './resolvers'

// Surveys All
export const surveys = {
  type: new GraphQLList(SurveyType),
  resolve: getAll
}
