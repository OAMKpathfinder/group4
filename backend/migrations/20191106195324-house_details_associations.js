'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'House_Details',
      'house_id',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Houses',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      }
    )
    .then(() => {
      return queryInterface.addColumn(
        'House_Details',
        'type_id',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'House_Parts',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: false,
    });
  })
  .then(()=>{
    return queryInterface.addColumn(
      'House_Details',
      'material_id',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Materials',
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
      'House_Details',
      'house_id'
      )
      .then(() => {
        return queryInterface.removeColumn(
          'House_Details',
          'type_id'
        );
      })
      .then(() => {
        return queryInterface.removeColumn(
          'House_Details',
          'material_id'
        );
      });
  }
};
