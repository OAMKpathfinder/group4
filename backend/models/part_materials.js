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
    Part_Materials.associate = function(models) {}
    return Part_Materials
}
