'use strict';

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        userTypeId: 1,
        email: 'shane@wilkey.io',
        username: 'happy',
        firstName: 'Shane',
        lastName: 'Wilkey',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        userTypeId: 2,
        email: 'shane@moyemont.com',
        username: 'moyemont',
        firstName: 'Shane',
        lastName: 'Moyemont',
        hashedPassword: bcrypt.hashSync('password2')
      },
      { userTypeId: 1,
        email: 'jeff@miller.com',
        username: 'jeff',
        firstName: 'Jeff',
        lastName: 'Miller',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['happy', 'moyemont', 'jeff'] }
    }, {});
  }
};
