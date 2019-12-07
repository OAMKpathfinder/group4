'use strict'
module.exports = (sequelize, DataTypes) => {
    const Houses = sequelize.define(
        'Houses',
        {
            decade: DataTypes.INTEGER,
            levels: DataTypes.INTEGER,
            heating_per_year: DataTypes.DOUBLE,
            warm_water_pipe: DataTypes.BOOLEAN,
            hjoht: DataTypes.DOUBLE,
        },
        {}
    )
    Houses.associate = function(models) {
        Houses.hasMany(models.House_Details, {
            as: 'House_Details',
            foreignKey: 'HousesId',
        })
        Houses.belongsTo(models.Users, { as: 'Users', foreignKey: 'UsersId' })
        Houses.belongsTo(models.Locations, {
            as: 'Locations',
            foreignKey: 'LocationsId',
        })
        Houses.belongsTo(models.Heating_Systems, {
            as: 'Heating_Systems',
            foreignKey: 'HeatingSystemsId',
        })
    }
    return Houses
}
