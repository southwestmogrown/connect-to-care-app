'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserType extends Model {
  
    static associate(models) {
      UserType.hasOne(models.User, {foreignKey: 'userTypeId' })
    }
  }
  UserType.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserType',
  });
  return UserType;
};