'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Facilities', [{
      adminId: 1,
      name: 'CMH',
      website: 'www.something.com',
      taxId: '1032890743928'
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Facilities', null, {});
  }
};
