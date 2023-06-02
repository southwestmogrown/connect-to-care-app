'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'FacilityAdmins';
    await queryInterface.bulkInsert(
      options,
      [
        {
          position: 'Director',
          userId: 3,
          address: '123 Cherry St. Bolivar, Mo. 65613',
          phoneNumber: '(123)555-5555',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'FacilityAdmins';
    await queryInterface.bulkDelete(options, null, {});
  },
};
