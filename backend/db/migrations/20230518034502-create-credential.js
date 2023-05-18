'use strict';
/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Credentials',
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
          references: { model: 'JobSeekers' },
        },
        birthDate: {
          allowNull: false,
          type: Sequelize.STRING(10),
        },
        ssn: {
          allowNull: false,
          type: Sequelize.STRING(11),
          unique: true,
        },
        hasBeenDisqualified: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        hasBeenTerminated: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        photoURL: {
          type: Sequelize.STRING(255),
        },
        resumeURL: {
          type: Sequelize.STRING(255),
        },
        tbTestURL: {
          type: Sequelize.STRING(255),
        },
        fluVaxURL: {
          type: Sequelize.STRING(255),
        },
        cov19VaxURL: {
          type: Sequelize.STRING(255),
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
    await queryInterface.dropTable('Credentials', options);
  },
};
