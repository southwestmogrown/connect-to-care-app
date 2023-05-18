'use strict';
/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Facilities',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        adminId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: { model: 'FacilityAdmins' },
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING(30),
        },
        website: {
          allowNull: false,
          type: Sequelize.STRING(100),
        },
        taxId: {
          allowNull: false,
          type: Sequelize.STRING(50),
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
    await queryInterface.dropTable('Facilities', options);
  },
};
