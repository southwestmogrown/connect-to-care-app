'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostActivity extends Model {
    static associate(models) {
      // define association here
      PostActivity.belongsTo(models.JobSeeker, { foreignKey: 'userId' });
      PostActivity.belongsTo(models.Post, { foreignKey: 'postId' });
    }
  }
  PostActivity.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'PostActivity',
    }
  );
  return PostActivity;
};
