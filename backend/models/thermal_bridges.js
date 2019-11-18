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
            as: 'House_Details1',
            foreignKey: 'HouseDetailsId1',
        })
        Thermal_Bridges.belongsTo(models.House_Details, {
            as: 'House_Details2',
            foreignKey: 'HouseDetailsId2',
        })
    }
    return Thermal_Bridges
}
