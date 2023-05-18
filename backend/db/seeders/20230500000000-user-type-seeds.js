'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'UserTypes';
    await queryInterface.bulkInsert(
      options,
      [
        {
          name: 'Job Seeker',
        },
        {
          name: 'Facility Administrator',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'UserTypes';
    await queryInterface.bulkDelete(options, null, {});
  },
};
