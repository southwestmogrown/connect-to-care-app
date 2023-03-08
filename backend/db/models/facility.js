'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Facility extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Facility.belongsTo(models.FacilityAdmin)
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