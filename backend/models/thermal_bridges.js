'use strict'
module.exports = (sequelize, DataTypes) => {
    const Thermal_Bridges = sequelize.define(
        'Thermal_Bridges',
        {
            bridge_length: DataTypes.DOUBLE,
        },
        {}
    )
    Thermal_Bridges.associate = function(models) {
        Thermal_Bridges.belongsTo(models.House_Details, {
            as: 'House_Details',
            foreignKey: 'HouseDetailsId',
        })
    }
    return Thermal_Bridges
}
