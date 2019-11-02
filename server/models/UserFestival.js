'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserFestival = sequelize.define('UserFestival', {
    user_Id: DataTypes.STRING,
    festival_Id: DataTypes.INTEGER }, {});
    UserFestival.associate = function(models) {
    // associations can be defined here
  };
  return UserFestival;
};