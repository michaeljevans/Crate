// Imports
import { GraphQLObjectType } from 'graphql'

// App Imports
import * as user from '../../modules/user/query'
import * as product from '../../modules/product/query'
import * as crate from '../../modules/crate/query'
import * as subscription from '../../modules/subscription/query'

// Query
// query is an instance of GraphQLObjectType
// fields are imported query objects
// The name of each imported query object is what ties the query to the API call. On the front end -- the operation value in the POST request will match one of the query names and that's how it knows what the fetch is asking for
const query = new GraphQLObjectType({
  name: 'query',
  description: 'API Queries [Read]',
// these are the available resources we can query in our application
// on the front end, we add the object name(s) (and properties we want to get back) to the fields property when we make the request.
// graphQL object
  fields: () => ({
    ...user,
    ...product,
    ...crate,
    ...subscription
  })
})

export default query