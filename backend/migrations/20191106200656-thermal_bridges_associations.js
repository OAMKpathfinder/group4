'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Thermal_Bridges',
      'connection1_id',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'House_Details',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      }
    )
    .then(() => {
      return queryInterface.addColumn(
        'Thermal_Bridges',
        'connection2_id',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'House_Details',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: false,
    });
  })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Thermal_Bridges',
      'connection1_id'
      )
      .then(() => {
        return queryInterface.removeColumn(
          'Thermal_Bridges',
          'connection2_id'
        );
      })
  }
};
