'use strict'

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Part_Types', 'PartId', {
            type: Sequelize.INTEGER,
            references: {
                model: 'House_Parts',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            allowNull: false,
        })
    },
    // eslint-disable-next-line no-unused-vars
    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('Part_Types', 'PartId')
    },
}
