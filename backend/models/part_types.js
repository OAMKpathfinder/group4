'use strict'
module.exports = (sequelize, DataTypes) => {
    const Part_Types = sequelize.define(
        'Part_Types',
        {
            name: DataTypes.STRING,
            producer: DataTypes.STRING,
            serial: DataTypes.STRING,
            price: DataTypes.DOUBLE,
            U_value: DataTypes.DOUBLE,
        },
        {}
    )
    Part_Types.associate = function(models) {
        Part_Types.belongsTo(models.House_Parts, {
            as: 'House_Parts',
            foreignKey: 'PartId',
        })
        // associations can be defined here
    }
    return Part_Types
}
