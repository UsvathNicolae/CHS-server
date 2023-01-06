'use strict';

const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("Returns", "status", {
      type: DataTypes.ENUM,
      values: [
        'OPEN',
        'APPROVED',
        'DECLINED'
      ],
      defaultValue: 'OPEN'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Returns", "status")
  }
};
