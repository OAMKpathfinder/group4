'use strict'

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface
            .addColumn('Thermal_Bridges', 'HouseDetailsId1', {
                type: Sequelize.INTEGER,
                references: {
                    model: 'House_Details',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                allowNull: false,
            })
            .then(() => {
                return queryInterface.addColumn(
                    'Thermal_Bridges',
                    'HouseDetailsId2',
                    {
                        type: Sequelize.INTEGER,
                        references: {
                            model: 'House_Details',
                            key: 'id',
                        },
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE',
                        allowNull: false,
                    }
                )
            })
    },

    // eslint-disable-next-line no-unused-vars
    down: (queryInterface, Sequelize) => {
        return queryInterface
            .removeColumn('Thermal_Bridges', 'HouseDetailsId1')
            .then(() => {
                return queryInterface.removeColumn(
                    'Thermal_Bridges',
                    'HouseDetailsId2'
                )
            })
    },
}
