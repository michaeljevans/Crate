// Imports
import { GraphQLObjectType } from 'graphql'

// App Imports
import * as user from '../../modules/user/mutations'
import * as product from '../../modules/product/mutations'
import * as crate from '../../modules/crate/mutations'
import * as subscription from '../../modules/subscription/mutations'


// Mutation

// mutation is an instance of GraphQLObjectType
// fields are imported mutation objects 
// The name of each IMPORTED object is what ties the mutation to the API call. On the front end -- the operation value in the POST request will match one of the mutation names, and that's how it knows what the fetch is asking for and where to get it from!
const mutation = new GraphQLObjectType({
  name: 'mutations',
  description: 'API Mutations [Create, Update, Delete]',

  fields: {
    ...user,
    ...product,
    ...crate,
    ...subscription
  }
})

export default mutation
