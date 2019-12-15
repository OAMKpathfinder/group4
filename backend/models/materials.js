'use strict'
module.exports = (sequelize, DataTypes) => {
    const Materials = sequelize.define(
        'Materials',
        {
            name: DataTypes.STRING,
            type: DataTypes.STRING,
            thermal_conductivity: DataTypes.DOUBLE,
            thickness: DataTypes.DOUBLE,
            description: DataTypes.TEXT('tiny'),
        },
        {}
    )
    Materials.associate = function(models) {
        // Materials.belongsToMany(models.House_Details, {
        //     through: models.Part_Materials,
        //     as: 'House_Details',
        //     foreignKey: 'HouseDetailsId',
        // })
        Materials.hasMany(models.Part_Materials, {
            as: 'Part_Materials',
            foreignKey: 'MaterialsId',
        })
    }
    return Materials
}
