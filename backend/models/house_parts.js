'use strict'
module.exports = (sequelize, DataTypes) => {
    const House_Parts = sequelize.define(
        'House_Parts',
        {
            part: DataTypes.STRING,
        },
        {}
    )
    House_Parts.associate = function(models) {
        House_Parts.hasMany(models.House_Details, {
            as: 'House_Details',
            foreignKey: 'HouseDetailsId',
        })
        House_Parts.hasMany(models.Part_Types, {
            as: 'Part_Types',
            foreignKey: 'PartId',
        })
    }
    return House_Parts
}
