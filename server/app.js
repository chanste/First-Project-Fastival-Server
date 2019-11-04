const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session'); // 용도?

const concert = require('./models').Concert;
const festival = require('./models').Festival;
const users = require('./models').Users;
const userfestival = require('./models').UserFestival;
const userconcert = require('./models').UserConcert;
const port = 5000;

let app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/users', (req, res) => {
  const data = req.body;
  //console.log(data);
  users.create({
      // id: data.id,
      user_Id: data.user_Id,
      email: data.email,
      username: data.username,
      givenname: data.givenname,
      photourl: data.photourl
  }).then(result => {
      res.status(200).json(result)
  })
})

app.get('/festivals', (req, res) => {
  festival
    .findAll()
    .then(result => {
      if (result) {
        //console.log(result);
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
      user_Id: data.user_Id,
      festival_Id: data.festival_Id
  }).then(result => {
      res.status(200).json(result)
  })
})   

app.get('/festivals/:id', (req, res) => {
  users.
    findOne({
      where: { user_Id: req.params.id },
      include: {
        model: festival
      }
    })
    .then(result => {
      res.status(200).json(result);
    })
  
    .catch(error => {
      res.status(500).send(error);
    })
})

app.get('/concerts', (req, res) => {
  concert
    .findAll()
    .then(result => {
      if (result) {
        res.status(200).json(result)
      } else {
        res.sendStatus(204);
      }
    })
    .catch(error => {
      res.status(500).send(error);
    })
});

app.get('/concerts/:id', (req, res) => {
  users.
    findOne({
      where: { user_Id: req.params.id },
      include: {
        model: concert
      }
    })
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => {
      res.status(500).send(error);
    }) 
});

app.post('/concerts', (req, res) => {
  const data = req.body;
  userconcert
    .create({
      user_Id: data.user_Id,
      concert_Id: data.concert_Id
    }).then(result => {
      res.status(200).json(result);
    })
})

app.delete('/concerts', (req, res) => {
  const data = req.body;
  userconcert
    .destroy({
      where: {
        user_Id: data.user_Id,
        concert_Id: data.concert_Id
      }
    })
    .then(() => {
      let response = {
        message: "delete complete",
        state: true
      };
      return res.json(response);
    })
})


app.set('port', port);
app.listen(app.get('port'));

module.exports = app;

// userfestival
  //   .findOne({
  //     where : {user_Id: req.params.id}
  //   })
  //   .then(result => {
  //     festival
  //       .findAll({
  //         limit: 100,
  //         where: {festival_Id: result.festival_Id}
  //       })
  //       .then(final => {
  //         if (final) {
  //           res.status(200).json(final);
  //         } else {
  //           res.sendStatus(204);
  //         }
  //       })
  //       .catch(error => {
  //         res.status(500).send(result);
  //       })
      // festival
      //   .find({
      //     where : {festival_Id: result.festival_Id}
      //   })
      //   .then(final => {
      //     if (final) {
      //       res.status(200).json(final);
      //     } else {
      //       res.sendStatus(204);
      //     }
      //   })
      //   .catch(error => {
      //     res.status(500).send(error);
      //   })

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