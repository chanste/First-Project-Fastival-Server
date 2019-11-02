'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true} ,
    user_Id: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    givenname: DataTypes.STRING,
    photourl: DataTypes.STRING
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};

