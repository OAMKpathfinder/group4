'use strict'
module.exports = (sequelize, DataTypes) => {
    const Confirmations = sequelize.define(
        'Confirmations',
        {
            code: DataTypes.STRING,
            expirationDate: DataTypes.DATE,
        },
        {}
    )
    Confirmations.associate = function(models) {
        Confirmations.belongsTo(models.Users, {
            as: 'Users',
            foreignKey: 'UsersId',
        })
    }
    return Confirmations
}
