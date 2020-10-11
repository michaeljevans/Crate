// Imports
import { GraphQLSchema } from 'graphql'

// App Imports
import query from './queries'
import mutation from './mutations'

// Schema
const schema = new GraphQLSchema({
  // is schema a different use of DB vocab?
  // methods for handling tables instead of mapping them out
  query,
  mutation
})

export default schema
