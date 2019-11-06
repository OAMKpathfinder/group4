'use strict';
module.exports = (sequelize, DataTypes) => {
  const Houses = sequelize.define('Houses', {
    decade: DataTypes.INTEGER,
    levels: DataTypes.INTEGER,
    heating_per_year: DataTypes.DOUBLE,
    warm_water_pipe: DataTypes.BOOLEAN
  }, {});
  Houses.associate = function(models) {
    Houses.hasMany(models.House_Details);
  };
  return Houses;
};