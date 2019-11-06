'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Houses',
      'owner_id',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
        autoIncrement: true,
      }
    )
    .then(() => {
      return queryInterface.addColumn(
        'Houses',
        'location_id',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Locations',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: false,
          autoIncrement: true,
    });
  })
  .then(()=>{
    return queryInterface.addColumn(
      'Houses',
      'heating_system_id',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Heating_Systems',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
        autoIncrement: true,
  });
  })
},

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Houses',
      'owner_id'
      )
      .then(() => {
        return queryInterface.removeColumn(
          'Houses',
          'location_id'
        );
      })
      .then(() => {
        return queryInterface.removeColumn(
          'Houses',
          'heating_system_id'
        );
      });
  }
};
