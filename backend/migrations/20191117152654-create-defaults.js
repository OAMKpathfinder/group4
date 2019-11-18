'use strict'
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Defaults', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            decade: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            houseImage: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            hjoht: {
                type: Sequelize.DOUBLE,
                allowNull: false,
            },
            description: {
                type: Sequelize.TEXT('tiny'),
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        })
    },
    // eslint-disable-next-line no-unused-vars
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Defaults')
    },
}
