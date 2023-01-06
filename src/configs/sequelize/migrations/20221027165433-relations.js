'use strict';

const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.addColumn("Receipts", "returnId", {type: DataTypes.INTEGER, allowNull: false, references: {model: "Returns", key: "id"}})
     await queryInterface.addColumn("Returns", "userId", {type: DataTypes.INTEGER, references: {model: "Users", key: "id"}})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Receipts", "returnId")
    await queryInterface.removeColumn("Returns", "userId")
  }
};
