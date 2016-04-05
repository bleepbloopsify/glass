var express = require('express');
var router = express.Router();
var assert = require('assert');

var dbm = require('../bin/DatabaseManager');
dbm = dbm.create();

dbm.register('leon', 'leon', function(res){console.log(res);});
dbm.auth('leon','leon', function(err, res){console.log(err, res);});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/login', function(req, res, next){
  res.render('login');
});

router.post('/login', function(req, res, next){
  console.log(req.body);
  var username = req.body.username;
  var password = req.body.password;
  dbm.auth(username, password, function(err, auth){
    if(err){
      console.log(err);
      return;
    }
    if(auth){
      console.log("authenticated ", username);
      res.send(true);
    }else{
      console.log('incorrect credentials ', username, password);
      res.send(false);
    }
  });
})

module.exports = router;
