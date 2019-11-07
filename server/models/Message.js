'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    msg: DataTypes.STRING,
  }, {});
  Message.associate = function(models) {
    // 메시지는 많은 유저 보유
    // Messages.hasMany(models.Users, {
    //   foreignKey: 'user_Id'
    // })
    // Messages.hasMany(models.Festivals, {
    //   foreignKey: 'festival_Id'
    // })
    Message.belongsTo(models.Users, {
      foreignKey: 'user_Id'
    })
    Message.belongsTo(models.Festival, {
      foreignKey: 'festival_Id'
    })
    // associations can be defined here
  };
  return Message;
};