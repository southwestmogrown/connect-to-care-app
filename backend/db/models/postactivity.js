'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostActivity extends Model {
    static associate(models) {
      // define association here
      PostActivity.belongsTo(models.JobSeeker);
      PostActivity.belongsTo(models.Post);
    }
  }
  PostActivity.init({
    userId: { 
      type: DataTypes.INTEGER,
      allowNull: false
    },
    postId: { 
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'PostActivity',
  });
  return PostActivity;
};