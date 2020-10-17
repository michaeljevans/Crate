// Imports
import { GraphQLString, GraphQLInt } from 'graphql'

// App Imports
import { UserType } from './types'
import { create, remove, updateUser} from './resolvers'

// Create
export const userSignup = {
  type: UserType,
  args: {
    name: {
      name: 'name',
      type: GraphQLString
    },

    email: {
      name: 'email',
      type: GraphQLString
    },

    password: {
      name: 'password',
      type: GraphQLString
    }
  },
  resolve: create
}

// Remove
export const userRemove = {
  type: UserType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    }
  },
  resolve: remove
}

<<<<<<< HEAD
//Update
export const userUpdate = {
  type: UserType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    },
    style: {
      name: 'style',
      type: GraphQLString
    }
  },
  resolve: updateUser
}
=======
>>>>>>> Working on survey resolver
