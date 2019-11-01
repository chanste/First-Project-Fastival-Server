const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session'); // 용도?

const concert = require('./models').Concert;
const festival = require('./models').Festival;
const port = 5000;

let app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/festivals', (req, res) => {
  festival
    .findAll()
    .then(result => {
      if (result) {
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