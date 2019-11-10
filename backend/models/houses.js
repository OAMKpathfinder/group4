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
    Houses.belongsTo(models.Users, {as: 'Users', foreignKey: 'owner_id'})
    Houses.belongsTo(models.Locations, {as: 'Locations', foreignKey: 'location_id'})
    Houses.belongsTo(models.Heating_Systems, {as: 'Heating_Systems', foreignKey: 'heating_system_id'})
  };
  return Houses;
};