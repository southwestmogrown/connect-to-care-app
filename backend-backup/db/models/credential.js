'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Credential extends Model {
    static associate(models) {
      // define association here
      Credential.belongsTo(models.JobSeeker, { foreignKey: 'userId' });
    }
  }
  Credential.init({
    userId: { 
      type: DataTypes.INTEGER,
      allowNull: false
    },
    birthDate: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10,10],
      }
    },
    ssn: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [11,11],
      }
    },
    hasBeenDisqualified: DataTypes.BOOLEAN,
    hasBeenTerminated: DataTypes.BOOLEAN,
    photoURL: DataTypes.STRING,
    resumeURL: DataTypes.STRING,
    tbTestURL: DataTypes.STRING,
    fluVaxURL: DataTypes.STRING,
    cov19VaxURL: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Credential',
  });
  return Credential;
};