'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FacilityAdmin extends Model {
    static associate(models) {
      FacilityAdmin.belongsTo(models.User);
      FacilityAdmin.hasOne(models.Facility);
      FacilityAdmin.hasMany(models.Post);
    }
  }
  FacilityAdmin.init({
    userId: { 
      type: DataTypes.INTEGER,
      allowNull: false
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4,30],
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4,255],
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10,13],
      }
    },
  }, {
    sequelize,
    modelName: 'FacilityAdmin',
  });
  return FacilityAdmin;
};