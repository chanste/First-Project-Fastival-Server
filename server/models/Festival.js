'use strict'

module.exports = (sequelize, DataTypes) => {
 const Festival = sequelize.define('Festival', {
   festival_Id: {
     type: DataTypes.INTEGER,
     autoIncrement: true,
     primaryKey: true
   },
   name: DataTypes.STRING,
   img_url: DataTypes.STRING,
   map_url: DataTypes.STRING
}, {
  hooks: {

    }
  });
  Festival.associate = function(models) {
    Festival.belongsToMany(models.Users, {
      through: 'UserFestival',
      foreignKey: 'festival_Id'
    })
    Festival.hasMany(models.Concert, {
      foreignKey: 'festival_Id'
    })
    Festival.hasMany(models.Message, {
      foreignKey: 'festival_Id'
    })
  };
  return Festival;
}


// festival_Id: {
//   type: DataTypes.INTEGER,
//   primaryKey: true,
//   autoIncrement: true
// }
