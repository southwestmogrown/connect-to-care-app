'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Facilities';
    await queryInterface.bulkInsert(
      options,
      [
        {
          adminId: 1,
          name: 'CMH',
          website: 'www.something.com',
          taxId: '1032890743928',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Facilities';
    await queryInterface.bulkDelete(options, null, {});
  },
};
