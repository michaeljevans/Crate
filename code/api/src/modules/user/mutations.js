// Imports
import { GraphQLString, GraphQLInt } from 'graphql'

// App Imports
import { UserType } from './types'
import { create, remove, updateUserStyle } from './resolvers'

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

// Update
export const userStyleUpdate = {
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
  resolve: updateUserStyle
}

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

