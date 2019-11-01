'use strict'

module.exports = (sequelize, DataTypes) => {
 const Concert = sequelize.define('Concert', {
   id: {
     type: DataTypes.INTEGER,
     primaryKey: true,
     autoIncrement: true
   },
   time: DataTypes.DATE,
   stage: DataTypes.STRING,
   artist: DataTypes.STRING,
   con_day: DataTypes.STRING,
   fest_id: DataTypes.INTEGER
}, {
  hooks: {

    }
  });
  Concert.associate = function(models) {

  };
  return Concert;
}
