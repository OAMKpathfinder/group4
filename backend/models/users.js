'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    full_name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM('admin', 'user')
  }, {});
  Users.associate = function(models) {
    Users.hasMany(models.Houses, { foreignKey: 'UsersId' })
  };
  return Users;
};