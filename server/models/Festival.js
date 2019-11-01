'use strict'

module.exports = (sequelize, DataTypes) => {
 const Festival = sequelize.define('Festival', {
   id: {
     type: DataTypes.INTEGER,
     primaryKey: true,
     autoIncrement: true
   },
   name: DataTypes.STRING,
   img_url: DataTypes.STRING,
   map_url: DataTypes.STRING
}, {
  hooks: {

    }
  });
  Festival.associate = function(models) {

  };
  return Festival;
}
