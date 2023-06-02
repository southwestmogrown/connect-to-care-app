'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'JobSeekers';
    await queryInterface.bulkInsert(
      options,
      [
        {
          userId: 1,
          title: 'CNA',
          specialty: 'Nursing!!!!',
        },
        {
          userId: 2,
          title: 'RN',
          specialty: 'Emergency Triage',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'JobSeekers';
    await queryInterface.bulkDelete(options, null, {});
  },
};
