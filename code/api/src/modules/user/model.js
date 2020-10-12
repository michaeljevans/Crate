'use strict'

// User
module.exports = function(sequelize, DataTypes) {
  // model of User data 
  // defining data types for values
  let User = sequelize.define('users', {
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.TEXT
    },
    password: {
      type: DataTypes.TEXT
    },
    role: {
      type: DataTypes.TEXT
    }
  })

  User.associate = function(models) {
    // User model is associated with the Subscription model
    // a user can have many subscriptions(?)
    User.hasMany(models.Subscription)
  }

  return User
}