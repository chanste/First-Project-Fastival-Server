// const express = require('express');

// const app = express();

// app.use('/', (res, req) => {
//   req.send('hello practice node server-deploy');
// })
// app.listen(5000, () => {
//   console.log('server on 5000');
// })
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const Sequelize = require('sequelize');
var db = {};

//console.log(process.env.DB_NAME);
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
  host: process.env.DB_HOST,
  dialect: 'mariadb',
  port: 33306
});

sequelize.sync();

// 현재 디렉토리의 .js 파일을 index.js로 import 시키는 것
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

  // 모델 간의 관계를 통합하는 것
  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  })

db.sequelize = sequelize;
db.Sequelize = Sequelize;
//console.log(db)
//console.log(db);
module.exports = db;