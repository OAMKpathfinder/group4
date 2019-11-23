'use strict'
module.exports = (sequelize, DataTypes) => {
    const Defaults = sequelize.define(
        'Defaults',
        {
            decade: DataTypes.INTEGER,
            houseImage: DataTypes.STRING,
            description: DataTypes.TEXT('tiny'),
        },
        {}
    )
    // eslint-disable-next-line no-unused-vars
    Defaults.associate = function(models) {
        // associations can be defined here
    }
    return Defaults
}
