'use strict';
/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Posts',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        userId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: { model: 'FacilityAdmins' },
        },
        facilityId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: { model: 'Facilities' },
        },
        department: {
          allowNull: false,
          type: Sequelize.STRING(30),
        },
        position: {
          allowNull: false,
          type: Sequelize.STRING(30),
        },
        specialQualifications: {
          type: Sequelize.STRING(255),
        },
        startDate: {
          allowNull: false,
          type: Sequelize.STRING(10),
        },
        endDate: {
          allowNull: false,
          type: Sequelize.STRING(10),
        },
        startTime: {
          allowNull: false,
          type: Sequelize.STRING(5),
        },
        endTime: {
          allowNull: false,
          type: Sequelize.STRING(5),
        },
        payRate: {
          allowNull: false,
          type: Sequelize.STRING(10),
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
      options
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Posts', options);
  },
};
