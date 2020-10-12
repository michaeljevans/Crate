'use strict'

// User
// NOTE: Add a style attribute w/ a default value of null which would then be set when the user takes a style surveyOnce I submit a survey I'm taken to my subscriptions page, and the subscription I've chosen is displayed - there's a heading which displays my style. The profile page also displays my chosen style.
// NOTE: Add type property as well.

module.exports = function(sequelize, DataTypes) {
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
    User.hasMany(models.Subscription)
  }

  return User
}