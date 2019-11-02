'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserFestival = sequelize.define('UserFestival', {
    user_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true} ,
    fest_id: DataTypes.INTEGER }, {});
    UserFestival.associate = function(models) {
    // associations can be defined here
  };
  return UserFestival;
};