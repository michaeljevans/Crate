'use strict'

module.exports = function(sequelize, DataTypes) {
  // creating Crate model 
  // each crate has a name and description 
  let Crate = sequelize.define('crates', {
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    }
  })

  Crate.associate = function(models) {
    Crate.hasMany(models.Subscription)
  }

  return Crate
}