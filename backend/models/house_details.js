'use strict'
module.exports = (sequelize, DataTypes) => {
    const House_Details = sequelize.define(
        'House_Details',
        {
            surface: DataTypes.DOUBLE,
            U_value: DataTypes.DOUBLE,
            hjoht: DataTypes.DOUBLE,
        },
        {}
    )
    House_Details.associate = function(models) {
        House_Details.hasMany(models.Thermal_Bridges),
            House_Details.belongsTo(models.Houses, {
                as: 'Houses',
                foreignKey: 'HousesId',
            }),
            House_Details.belongsTo(models.Materials, {
                as: 'Materials',
                foreignKey: 'MaterialsId',
            }),
            House_Details.belongsTo(models.House_Parts, {
                as: 'House_Parts',
                foreignKey: 'HousePartsId',
            })
    }
    return House_Details
}
