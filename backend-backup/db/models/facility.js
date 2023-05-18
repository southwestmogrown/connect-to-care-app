'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Facility extends Model {
    static associate(models) {
      Facility.belongsTo(models.FacilityAdmin, { foreignKey: 'adminId' });
      Facility.hasMany(models.Post, { foreignKey: 'facilityId' });
    }
  }
  Facility.init({
    adminId: { 
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2,30],
      }
    },
    website: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2,100],
      }
    },
    taxId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4,50],
      }
    },
  }, {
    sequelize,
    modelName: 'Facility',
  });
  return Facility;
};