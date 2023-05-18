'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.bulkInsert('Posts', [
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
      payRate: '$35/hr'
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Posts', null, {});
  }
};
