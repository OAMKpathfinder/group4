'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Houses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      decade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      levels: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      heating_per_year: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      warm_water_pipe: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Houses');
  }
};