'use strict'

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface
            .addColumn('House_Details', 'HousesId', {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Houses',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                allowNull: false,
            })
            .then(() => {
                return queryInterface.addColumn(
                    'House_Details',
                    'HousePartsId',
                    {
                        type: Sequelize.INTEGER,
                        references: {
                            model: 'House_Parts',
                            key: 'id',
                        },
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE',
                        allowNull: false,
                    }
                )
            })
            .then(() => {
                return queryInterface.addColumn(
                    'House_Details',
                    'MaterialsId',
                    {
                        type: Sequelize.INTEGER,
                        references: {
                            model: 'Materials',
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
            .removeColumn('House_Details', 'HousesId')
            .then(() => {
                return queryInterface.removeColumn(
                    'House_Details',
                    'HousePartsId'
                )
            })
            .then(() => {
                return queryInterface.removeColumn(
                    'House_Details',
                    'MaterialsId'
                )
            })
    },
}
