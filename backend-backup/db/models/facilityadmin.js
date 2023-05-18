'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FacilityAdmin extends Model {
    static associate(models) {
      FacilityAdmin.belongsTo(models.User, { foreignKey: 'userId' });
      FacilityAdmin.hasOne(models.Facility, { foreignKey: 'adminId' });
      FacilityAdmin.hasMany(models.Post, { foreignKey: 'userId' });
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