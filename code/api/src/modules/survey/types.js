// Imports
import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'

// App Imports
import { UserType } from '../user/types'

// Survey type
const SurveyType = new GraphQLObjectType({
  name: 'survey',
  description: 'Survey Type',

  fields: () => ({
    id : { type: GraphQLInt },
    user: { type: UserType },
    surveyContents: { type: GraphQLString },
    result: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
})

export default SurveyType
