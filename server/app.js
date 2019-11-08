//const place = new Array(), // 장소
//       title1 = new Array(), // 공연명
//       name = new Array(), // 단체명
//       time = new Array();
//       con_day = new Array(); // 시간

//app.js 
const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session'); // 용도?

const concert = require('./models').Concert;
const festival = require('./models').Festival;
const users = require('./models').Users;
const userfestival = require('./models').UserFestival;
const userconcert = require('./models').UserConcert;
const msg = require('./models').Message;
// const place = require('./crawlingdata/Crawling').place;
// const title = require('./crawlingdata/Crawling').title1;
// const time = require('./crawlingdata/Crawling').time;
// const con_day = require('./crawlingdata/Crawling').con_day;
const crawlingdata_3 = require('./crawlingdata/Day3');
const crawlingdata_4 = require('./crawlingdata/Day4');
const crawlingdata_5 = require('./crawlingdata/Day5');
const crawlingdata_6 = require('./crawlingdata/Day6');
//const result = require('./crawlingdata/Crawling').result;
//const test = require('./models').Test;
var server = require('http').createServer(app);
const io = require('socket.io')(server);


const port = 5000;
let chkBoolean = false; 
// msg
//     .findAll()
//     .then(result => {
//       console.log(result);
//       // socket.emit('chat', {
//       //   message: result
//       // })
//     });
//users
  //   .findAll({
  //     include: [{
  //       attributes: ['_id', 'name', 'avatar'],
  //       model: msg,
  //       where: {fest_id: 1}
  //     }]
  //   })

var test_1 = io.of('/msg/1');

test_1.on('connection', socket => {
  msg
    .findAll({
      attributes:[
        ['msg', 'text'],
        //createdAt
      ],
      where: {festival_Id: 1},
      include: [{
        attributes: [
         ['user_Id', '_id'],
         ['username', 'name'],
         ['photourl', 'avatar']
         ],
        model: users,
      }]
    })
    .then(result => {
      console.log(result);
      socket.emit('chat', result);
    });// 클라이언트에서는 쓰면 emit 이 필요한 것
  socket.on('chat', data => {
    msg
      .create({
        user_Id: data.user._id,
        //festival_Id: data.festival_Id,
        msg: data.text
      })
    test_1.emit('chat', data)
  })
});


// 비동기 개념 이해(promise 부분)

// date
function stringToDate(value) {
  let temp = value.split(':');
  temp[0] = Number(temp[0]) + 1;

  if (temp[0] === 25) {
    temp[0] === 1
  }

  temp[0] = temp[0] +  '';
  temp = temp.join(':');
  return temp;
}
//console.log(crawlingdata());

function numChk() {
  return new Promise((resolve, reject) => {
    concert.
    findAll()
    .then(result => {
      if (result.length !== 0) {
        //console.log(result);
        chkBoolean = true;
        resolve(chkBoolean);
      } else {
        resolve(chkBoolean);
      }
    })
    .catch(error => {
      res.status(500).send(error);
    })
  })
}

//console.log(result.place[0]);
    // test
    //   .create({
    //     place: result.place[0],
    //     title: result.title[0],
    //     time: result.time[0],
    //     con_day: result.con_day[0]
    //   })
    // testNumChk().then(() => {
    //   console.log(chkBoolean);
    //   if (!chkBoolean) {
    //     for (let i = 0; i < result.place.length; i++) {
    //       test
    //         .create({
    //           place: result.place[i],
    //           title: result.title[i],
    //           starttime: result.time[i],
    //           endtime: stringToDate(result.time[i]),
    //           con_day: result.con_day[3]
    //         });
    //       }
    //     }
    // });


function ConcertInputFn() {
  crawlingdata_3().then(result_3 => {
    crawlingdata_4().then(result_4 => {
      crawlingdata_5().then(result_5 => {
        crawlingdata_6().then(result_6 => {
          numChk().then(() => {
            if (!chkBoolean) {
              console.log(result_6.con_day[0]);
              for (let i = 0; i < result_3.place.length; i++) {
                concert
                  .create({
                    stage: result_3.place[i],
                    artist: result_3.title[i],
                    starttime: result_3.time[i],
                    endtime: stringToDate(result_3.time[i]),
                    con_day: Number(result_3.con_day[0].substring(result_3.con_day[0].length-4, result_3.con_day[0].length-6)),
                    festival_Id: 1
                  })
              }
              for (let i = 0; i < result_4.place.length; i++) {
                concert
                  .create({
                    stage: result_4.place[i],
                    artist: result_4.title[i],
                    starttime: result_4.time[i],
                    endtime: stringToDate(result_4.time[i]),
                    con_day: Number(result_4.con_day[1].substring(result_4.con_day[1].length-4, result_4.con_day[1].length-6)),
                    festival_Id: 1
                  })
              }
              for (let i = 0; i < result_5.place.length; i++) {
                concert
                  .create({
                    stage: result_5.place[i],
                    artist: result_5.title[i],
                    starttime: result_5.time[i],
                    endtime: stringToDate(result_5.time[i]),
                    con_day: Number(result_5.con_day[2].substring(result_5.con_day[2].length-4, result_5.con_day[2].length-6)),
                    festival_Id: 1
                  })
              }
              for (let i = 0; i < result_6.place.length; i++) {
                concert
                  .create({
                    stage: result_6.place[i],
                    artist: result_6.title[i],
                    starttime: result_6.time[i],
                    endtime: stringToDate(result_6.time[i]),
                    con_day: Number(result_6.con_day[3].substring(result_6.con_day[3].length-4, result_6.con_day[3].length-6)),
                    festival_Id: 1
                  })
              }
            }
          })
        })
      })
    })
  });
}

ConcertInputFn();

//console.log(result);
// let testFn = () => {
//   for (let i = 0; i < place.length; i++) {
//     test.create({
//       place: place[i],
//       title: title[i],
//       time: time[i],
//       con_day: con_day[0]
//     });
//   }
// }
// testFn();
//console.log(1);


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
      include: [{
        attributes: ['festival_Id','name', 'map_url', 'img_url'],
        model: festival,
        //through: { attributes: [] }
      }]
    })
    .then(result => {
      res.status(200).json(result.Festivals);
    })
  
    .catch(error => {
      res.status(500).send(error);
    })
})

app.get('/concerts/:fest_id', (req, res) => {
  concert
    .findAll({
      // 진짜 소스
      // include: [{
      //   model: festival,
      //   where: { festival_Id: req.params.fest_id}
      // }]
      attributes: [
        ['stage', 'stg']
      ],
      where : {concert_Id : 133},
      include: {
        model: festival,
        where: { festival_Id: req.params.fest_id}
      }
    })

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

app.get('/concerts_user/:id/:fest_id', (req, res) => {
  users.
    findOne({
      where: { 
        user_Id: req.params.id,
      },
      include: {
        attributes: ['concert_Id', 'starttime', 'endtime', 'stage', 'artist', 'con_day', 'festival_Id'],
        model: concert,
        where: {
          festival_Id: req.params.fest_id
        },
        through: {attributes: []}
      }
    })
    .then(result => {
      res.status(200).json(result.Concerts);
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

app.delete('/festivals', (req, res) => {
  const data = req.body;
  userfestival
    .destroy({
      where: {
        user_Id: data.user_Id,
        festival_Id: data.festival_Id
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


// app.set('port', port);
// app.listen(app.get('port'));
server.listen(port, function(){
  console.log('listening on port 5000');
})

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