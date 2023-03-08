'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FacilityAdmin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      FacilityAdmin.belongsTo(models.User);
    }
  }
  FacilityAdmin.init({
    position: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4,30],
      }
    },
    title: {
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