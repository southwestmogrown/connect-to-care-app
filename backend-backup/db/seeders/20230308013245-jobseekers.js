'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('JobSeekers', [
      {
        userId: 1,
        title: 'CNA',
        specialty: 'Nursing!!!!'
      },
      {
        userId: 2,
        title: 'RN',
        specialty: 'Emergency Triage'
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('JobSeekers', null, {});
  }
};
