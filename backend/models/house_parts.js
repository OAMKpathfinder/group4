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
    }
    return House_Parts
}
