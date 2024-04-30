'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const DataTypes = Sequelize.DataTypes;
    await queryInterface.addColumn('users', 'balanceSets', {
      type: DataTypes.INTEGER,
      defaultValue: 0
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'balanceSets');
  }
};
