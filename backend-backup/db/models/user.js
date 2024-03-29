'use strict';
const bcrypt = require('bcryptjs');

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { id, userTypeId, userName, email, firstName, lastName } = this;
      return { id, userTypeId, userName, email, firstName, lastName };
    }

    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }

    static getCurrentUserById(id) {
      return User.scope('currentUser').findByPk(id);
    }

    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            userName: credential,
            email: credential,
          },
        },
      });

      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }

    static async signup({
      userTypeId,
      userName,
      email,
      password,
      firstName,
      lastName,
    }) {
      const hashedPassword = bcrypt.hashSync(password);

      const user = await User.create({
        userTypeId,
        userName,
        firstName,
        lastName,
        email,
        hashedPassword,
      });

      return await User.scope('currentUser').findByPk(user.id);
    }

    static associate(models) {
      User.belongsTo(models.UserType, { foreignKey: 'userTypeId' });
      User.hasOne(models.FacilityAdmin, { foreignKey: 'userId' });
      User.hasOne(models.JobSeeker, { foreignKey: 'userId' });
    }
  }
  User.init(
    {
      userTypeId: DataTypes.INTEGER,
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error('Cannot be an email.');
            }
          },
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error('Cannot be an email.');
            }
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 50],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error('Cannot be an email.');
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
          isEmail: true,
        },
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      defaultScope: {
        attributes: {
          exclude: [
            'hashedPassword',
            'email',
            'createdAt',
            'updatedAt',
            'firstName',
            'lastName',
            'UserTypeId',
          ],
        },
      },
      scopes: {
        currentUser: {
          attributes: {
            exclude: [
              'hashedPassword',
              'email',
              'firstName',
              'lastName',
              'UserTypeId',
            ],
          },
        },
        loginUser: {
          attributes: { exclude: ['UserTypeId'] },
        },
      },
    }
  );
  return User;
};
