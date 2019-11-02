const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session'); // 용도?

const concert = require('./models').Concert;
const festival = require('./models').Festival;
const users = require('./models').Users;
const userfestival = require('./models').UserFestival;
const port = 5000;

let app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/users', (req, res) => {
  const data = req.body;
  console.log(data);
  users.create({
      // id: data.id,
      email: data[0].email,
      username: data[0].username,
      photoUrl: data[0].photoUrl
  }).then(result => {
      res.status(200).json(result)
  })
})

app.get('/festivals', (req, res) => {
  festival
    .findAll()
    .then(result => {
      if (result) {
        console.log(result);
        res.status(200).json(result)
      } else {
        res.sendStatus(204);
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error)
    })
})

app.post('/festivals', (req, res) => {
  const data = req.body;
  userfestival
  .create({
      user_id: data[0].user_id,
      fest_id: data[0].festival_id
  }).then(result => {
      res.status(200).json(result)
  })
})   

// app.post('/festivals', (req, res) => {
//   const data = req.body;

//   festival
//     .create({
//       name: data.name,
//       img_url: data.img_url,
//       map_url: data.map_url
//     })
//     .then(result => {
//       res.status(200).json(result);
//     })
// })


// app.use(cors({
//   origin:['http://3.133.96.196:5000'],
//   methods:['GET', 'POST']
// }))

// const models = require('./models');

// models.sequelize.sync().then(() => {
//   console.log('db 연결 성공')
// }).catch(err => {
//   console.log('연결 실패');
//   //console.log(err);
// })

app.set('port', port);
app.listen(app.get('port'));

module.exports = app;