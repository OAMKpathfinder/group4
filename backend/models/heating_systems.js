'use strict';
module.exports = (sequelize, DataTypes) => {
  const Heating_Systems = sequelize.define('Heating_Systems', {
    type: DataTypes.STRING
  }, {});
  Heating_Systems.associate = function(models) {
    Heating_Systems.hasMany(models.Houses);
  };
  return Heating_Systems;
};