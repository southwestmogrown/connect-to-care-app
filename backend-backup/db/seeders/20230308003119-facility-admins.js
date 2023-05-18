'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('FacilityAdmins', [{
      position: 'Director',
      userId: 3,
      address: '123 Cherry St. Bolivar, Mo. 65613',
      phoneNumber: '(123)555-5555',
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('FacilityAdmins', null, {});
  }
};
