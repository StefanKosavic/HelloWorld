var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const {userAuthorization}=require("./authorization");
var pg =require('pg');


/* I used the postgres database and made a free instance via https://www.elephantsql.com/ which I linked here */
var config = {
  user: 'zkjlzlks',
  database: 'zkjlzlks',
  password: '0Ohn8gC7Ape2Q70DsfiKPmqFHIr9DV8H',
  host: 'manny.db.elephantsql.com',
  port: 5432,
  max: 100,
  idleTimeoutMillis: 30000,
};
var pool = new pg.Pool(config);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hello-rest', function(req, res, next) {
  res.json({message: "Hello World!"});
});

router.get('/hello', function(req, res, next) {
  res.render('hello');
});

router.get('/hello/:language', function(req, res, next) {
  pool.connect(function(err,client,done){
    if(err){
      res.end('{"error" : "Error", "status" : 500');
    }
    client.query(`SELECT * FROM hello_world where language=$1`,
        [req.params.language],function (err,result){
      done();
      if(err){
        console.info(err);
        res.sendStatus(500);
      }else{
        req.language = result.rows;
        console.log(req.language)
        res.render('pickLanguage', {
          language:req.language
        });
      }
    })
  })
});

router.get('/secure/hello', function(req, res, next) {
  res.render('login');
});

/* When logging in to the system, I take information about the user's username and password from the form.
   I then send a request to the database to pick up data on that user, if one exists. If the combination of username and password is correct,
   the user gets access to the system, and I save his data in a session so I can access them later when I need them.
   Package I used: https://www.npmjs.com/package/express-session */
router.post('/login', async function(req, res, next) {
  var admin = {
    username: req.body.username,
    password: req.body.password,
  };
  pool.connect(function(err,client,done){
    if(err){
      res.end('{"error" : "Error", "status" : 500');
    }
    client.query(`SELECT * FROM admin where username=$1`,[admin.username],async function (err,result){
      done();
      if(err){
        console.info(err);
        res.sendStatus(500);
      }else{
        if(result.rows.length === 0){
          return res.sendStatus(404);
        }else{
          let kriptoPassword = result.rows[0].password;
          if(await bcrypt.compare(admin.password,kriptoPassword)){
            res.admin = {
              id: result.rows[0].id_admin,
              username: result.rows[0].username,
            }
            req.session.id_admin = res.admin.id;

            res.redirect('/admin');
          }
          else{
            return res.sendStatus(401);
          }
        }
      }
    })
  })
});

router.get('/admin',userAuthorization, function(req, res, next) {
  res.render('admin');
});

router.post('/admin', async function(req, res, next) {
  var newGreeting = {
    language: req.body.language,
    greeting: req.body.greeting,
  };
  pool.connect(function(err,client,done){
    client.query(`insert into hello_world (language,greeting)
                  values ($1,$2)`,
        [newGreeting.language,newGreeting.greeting],
        function (err,result){
          done();
          if(err){
            res.sendStatus(401)
          }else{
            res.render('admin')
          }
        })
  })
});

module.exports = router;
