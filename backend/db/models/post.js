'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      // define association here
      Post.belongsTo(models.FacilityAdmin);
      Post.belongsTo(models.Facility);
    }
  }
  Post.init({
    userId: { 
      type: DataTypes.INTEGER,
      allowNull: false
    },
    facilityId: { 
      type: DataTypes.INTEGER,
      allowNull: false
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2,30],
      }
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2,30],
      }
    },
    specialQualifications: {
      type: DataTypes.STRING,
      validate: {
        len: [0,255],
      }
    },
    startDate: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10,10],
      }
    },
    endDate: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10,10],
      }
    },
    startTime: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5,5],
      }
    },
    endTime: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5,5],
      }
    },
    payRate: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5,10],
      }
    },
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};