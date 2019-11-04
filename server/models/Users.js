'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    user_Id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    givenname: DataTypes.STRING,
    photourl: DataTypes.STRING
  }, {});
  Users.associate = function(models) {
    Users.belongsToMany(models.Festival, {
      through: 'UserFestival',
      foreignKey: 'user_Id'
    })
    Users.belongsToMany(models.Concert, {
      through: 'UserConcert',
      foreignKey: 'user_Id'
    })
    // associations can be defined here
  };
  return Users;
};

 // id: {
    //   type: DataTypes.INTEGER, 
    //   autoIncrement: true,
    //   primaryKey: true
    // } 