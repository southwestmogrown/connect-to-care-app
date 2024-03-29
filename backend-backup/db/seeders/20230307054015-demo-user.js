'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        email: 'demo@user.io',
        userName: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Demo',
        lastName: 'Lition',
        userTypeId: 1
      },
      {
        email: 'user1@user.io',
        userName: 'FakeUser1',
        firstName: 'Fake',
        lastName: 'User1',
        hashedPassword: bcrypt.hashSync('password2'),
        userTypeId: 1
      },
      {
        email: 'user2@user.io',
        userName: 'FakeUser2',
        firstName: 'Fake',
        lastName: 'User2',
        hashedPassword: bcrypt.hashSync('password3'),
        userTypeId: 2
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete("Users", {
      userName: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};