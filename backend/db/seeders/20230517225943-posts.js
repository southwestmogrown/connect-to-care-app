'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Posts';
    await queryInterface.bulkInsert(
      options,
      [
        {
          userId: 1,
          facilityId: 1,
          department: 'Emergency',
          position: 'LNP',
          specialQualifications: '',
          startDate: '01/01/0101',
          endDate: '01/03/0101',
          startTime: '08:00',
          endTime: '16:00',
          payRate: '$35/hr',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Posts';
    await queryInterface.bulkDelete(options, null, {});
  },
};
