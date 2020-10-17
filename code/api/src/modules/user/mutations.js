// Imports
import { GraphQLString, GraphQLInt } from 'graphql'

// App Imports
import { UserType } from './types'
<<<<<<< HEAD
import { create, remove, updateUser} from './resolvers'
=======
import { create, remove, updateUserStyle } from './resolvers'
>>>>>>> Working on style update

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

<<<<<<< HEAD
// Remove
export const userRemove = {
=======
// Update
export const userStyleUpdate = {
>>>>>>> Working on style update
  type: UserType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    }
  },
<<<<<<< HEAD
  resolve: remove
=======
  resolve: updateUserStyle
>>>>>>> Working on style update
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
