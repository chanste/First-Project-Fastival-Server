'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserFestival = sequelize.define('UserFestival', {
    user_Id: {
      type: DataTypes.STRING,
      primaryKey: true      
    },
    festival_Id: {
      type: DataTypes.INTEGER,
      primaryKey: true      
    }
    });
    UserFestival.associate = function(models) {
      UserFestival.belongsTo(models.Users, {
        foreignKey: 'user_Id'
      });
      UserFestival.belongsTo(models.Festival, {
        foreignKey: 'festival_Id'
      })
    // associations can be defined here
  };
  return UserFestival;
};