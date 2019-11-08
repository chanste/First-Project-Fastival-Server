'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserConcert = sequelize.define('UserConcert', {
    user_Id: {
      type: DataTypes.STRING,
      primaryKey: true      
    },
    concert_Id: {
      type: DataTypes.INTEGER,
      primaryKey: true      
    }
  });
  UserConcert.associate = function(models) {
    UserConcert.belongsTo(models.Users, {
      foreignKey: 'user_Id'
    });
    UserConcert.belongsTo(models.Concert, {
      foreignKey: 'concert_Id'
    })
  };
  return UserConcert;
}