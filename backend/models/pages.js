'use strict'
module.exports = (sequelize, DataTypes) => {
    const Pages = sequelize.define(
        'Pages',
        {
            title: DataTypes.STRING,
            slug: DataTypes.STRING,
            excerpt: DataTypes.STRING,
            image: DataTypes.STRING,
            body: DataTypes.TEXT,
        },
        {}
    )
    // eslint-disable-next-line no-unused-vars
    Pages.associate = function(models) {
        // associations can be defined here
    }
    return Pages
}
