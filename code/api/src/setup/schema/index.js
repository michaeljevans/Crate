// Imports
import { GraphQLSchema } from 'graphql'

// App Imports
import query from './queries'
import mutation from './mutations'
// either getting queries (Read) or mutating (Create, Update, Delete)

// Schema
// schema is created by supplying the root types of each type of operation (query and mutation). The query and mutation objects are already created with name, description and field properties and imported into this file
const schema = new GraphQLSchema({
  query,
  mutation
})
// exporting schema so it can be accessed globally
export default schema
