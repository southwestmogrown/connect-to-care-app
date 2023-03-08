'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Credentials', [
      {
        userId: 1,
        birthDate: '01/12/1234',
        ssn: '123-45-6789',
        hasBeenDisqualified: false,
        hasBeenTerminated: false,
        photoURL: '',
        resumeURL: '',
        tbTestURL: '',
        fluVaxURL: '',
        cov19VaxURL: '',
      },
      {
        userId: 2,
        birthDate: '03/12/1234',
        ssn: '125-45-6789',
        hasBeenDisqualified: false,
        hasBeenTerminated: false,
        photoURL: '',
        resumeURL: '',
        tbTestURL: '',
        fluVaxURL: '',
        cov19VaxURL: '',
      },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Credentials', null, {});
  }
};
