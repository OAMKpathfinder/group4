'use strict'

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface
            .addColumn('Houses', 'UsersId', {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Users',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                allowNull: false,
            })
            .then(() => {
                return queryInterface.addColumn('Houses', 'LocationsId', {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'Locations',
                        key: 'id',
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                    allowNull: false,
                })
            })
            .then(() => {
                return queryInterface.addColumn('Houses', 'HeatingSystemsId', {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'Heating_Systems',
                        key: 'id',
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                    allowNull: false,
                })
            })
    },
    // eslint-disable-next-line no-unused-vars
    down: (queryInterface, Sequelize) => {
        return queryInterface
            .removeColumn('Houses', 'UsersId')
            .then(() => {
                return queryInterface.removeColumn('Houses', 'LocationsId')
            })
            .then(() => {
                return queryInterface.removeColumn('Houses', 'HeatingSystemsId')
            })
    },
}
