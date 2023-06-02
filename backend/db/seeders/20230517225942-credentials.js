'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Credentials';
    await queryInterface.bulkInsert(
      options,
      [
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
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Credentials';
    await queryInterface.bulkDelete(options, null, {});
  },
};
