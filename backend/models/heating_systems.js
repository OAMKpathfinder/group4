'use strict';
module.exports = (sequelize, DataTypes) => {
  const Heating_Systems = sequelize.define('Heating_Systems', {
    type: DataTypes.STRING
  }, {});
  Heating_Systems.associate = function(models) {
  };
  return Heating_Systems;
};