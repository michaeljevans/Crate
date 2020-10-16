'use strict'

// Survey
module.exports = function(sequelize, DataTypes) {
  let Survey = sequelize.define('surveys', {
    userId: {
      type: DataTypes.INTEGER
    },
    result: {
      type: DataTypes.TEXT
    },
    surveyContents: {
      type: DataTypes.TEXT
    }
  })

  Survey.associate = function(models) {
    Survey.belongsTo(models.User)
  }

  return Survey
}
