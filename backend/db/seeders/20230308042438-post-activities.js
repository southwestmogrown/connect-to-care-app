'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('PostActivities', [
    {
      userId: 1,
      postId: 3
    },
    {
      userId: 2,
      postId: 3
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('PostActivities', null, {});
  }
};
