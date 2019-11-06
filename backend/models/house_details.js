'use strict';
module.exports = (sequelize, DataTypes) => {
  const House_Details = sequelize.define('House_Details', {
    surfacae: DataTypes.DOUBLE,
    U_value: DataTypes.DOUBLE,
    hjoht: DataTypes.DOUBLE
  }, {});
  House_Details.associate = function(models) {
    House_Details.hasMany(models.Thermal_Bridges);
  };
  return House_Details;
};