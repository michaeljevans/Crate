// Imports
import { GraphQLSchema } from 'graphql'

// App Imports
// These files have imported all queries and mutations from migration tables
import query from './queries'
import mutation from './mutations'

// Schema
const schema = new GraphQLSchema({
  query,
  mutation
})

export default schema
