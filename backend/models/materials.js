'use strict';
module.exports = (sequelize, DataTypes) => {
  const Materials = sequelize.define('Materials', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    description: DataTypes.TEXT('tiny')
  }, {});
  Materials.associate = function(models) {
    Materials.hasMany(models.House_Details, { as: 'House_Details', foreignKey: 'MaterialsId' });
  };
  return Materials;
};