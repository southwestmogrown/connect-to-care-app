'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('UserTypes', [
    {
      name: 'Job Seeker',
    },
    {
      name: "Facility Administrator"
    }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserTypes', null, {});
  }
};
