'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JobSeeker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      JobSeeker.belongsTo(models.User, {foreignKey: 'userId'});
      JobSeeker.hasOne(models.Credential, { foreignKey: 'userId' });
      JobSeeker.hasMany(models.PostActivity, { foreignKey: 'userId' });
    }
  }
  JobSeeker.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4,100],
      }
    },
    specialty: {
      type: DataTypes.STRING,
      validate: {
        len: [0,255],
      }
    },
  }, {
    sequelize,
    modelName: 'JobSeeker',
  });
  return JobSeeker;
};