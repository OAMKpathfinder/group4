'use strict'
module.exports = (sequelize, DataTypes) => {
    const Part_Materials = sequelize.define(
        'Part_Materials',
        {
            HouseDetailsId: DataTypes.INTEGER,
            MaterialsId: DataTypes.INTEGER,
        },
        {}
    )
    // eslint-disable-next-line no-unused-vars
    Part_Materials.associate = function(models) {
        Part_Materials.belongsTo(models.Materials, {
            as: 'Materials',
            foreignKey: 'MaterialsId',
        })
        Part_Materials.belongsTo(models.House_Details, {
            as: 'House_Details',
            foreignKey: 'HouseDetailsId',
        })
    }
    return Part_Materials
}
