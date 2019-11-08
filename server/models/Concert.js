'use strict'

module.exports = (sequelize, DataTypes) => {
 const Concert = sequelize.define('Concert', {
  concert_Id: {
     type: DataTypes.INTEGER,
     primaryKey: true,
     autoIncrement: true
   },
   stage: DataTypes.STRING,
   artist: DataTypes.STRING,
   starttime: DataTypes.STRING,
   endtime: DataTypes.STRING,
   con_day: DataTypes.INTEGER,
   //festival_Id: DataTypes.INTEGER // 외래 키 처리
}, {
  hooks: {

    }
  });
  Concert.associate = function(models) {
    Concert.belongsToMany(models.Users, {
      through: 'UserConcert',
      foreignKey: 'concert_Id'
    })
    Concert.belongsTo(models.Festival, {
      foreignKey: 'festival_Id'
    })
  };
  return Concert;
}
