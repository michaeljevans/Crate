// Imports
import { GraphQLSchema } from 'graphql'

// App Imports
import query from './queries'
import mutation from './mutations'

// Schema
const schema = new GraphQLSchema({
  // this seems like a different use of DB schema vocab
  // methods for handling tables instead of mapping them out
  // resolvers at bottom might use models as a map to access DB
  query,
  mutation
})

export default schema
