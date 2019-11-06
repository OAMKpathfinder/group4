'use strict';
module.exports = (sequelize, DataTypes) => {
  const Thermal_Bridges = sequelize.define('Thermal_Bridges', {
    bridge_length: DataTypes.DOUBLE
  }, {});
  Thermal_Bridges.associate = function(models) {
  };
  return Thermal_Bridges;
};