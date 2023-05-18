'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('PostActivities', [
    {
      userId: 1,
      postId: 1
    },
    {
      userId: 2,
      postId: 1
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('PostActivities', null, {});
  }
};
