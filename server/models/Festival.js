'use strict'

module.exports = (sequelize, DataTypes) => {
 const Festival = sequelize.define('Festival', {
  festival_Id: DataTypes.INTEGER,
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


// festival_Id: {
//   type: DataTypes.INTEGER,
//   primaryKey: true,
//   autoIncrement: true
// }
