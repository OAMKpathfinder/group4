'use strict'
module.exports = (sequelize, DataTypes) => {
    const Locations = sequelize.define(
        'Locations',
        {
            country: DataTypes.STRING,
        },
        {}
    )
    Locations.associate = function(models) {
        Locations.hasMany(models.Houses, {
            as: 'Houses',
            foreignKey: 'LocationsId',
        })
    }
    return Locations
}
