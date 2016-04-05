var mongodb = require('mongodb');
var bcrypt = require('bcrypt');
var assert = require('assert');
var bcrypt = require('bcrypt');

DatabaseManager.DATABASE_URL = process.env.DATABASE_URL ||
  'mongodb://localhost:27017/ayyyyylmao';
DatabaseManager.USERS = 'users';

function DatabaseManager(mongoClient, databaseUrl){
  this.mongoClient = mongoClient;
  this.databaseUrl = databaseUrl;
};

DatabaseManager.create = function(){
  var databaseManager = new DatabaseManager(
    mongodb.MongoClient, DatabaseManager.DATABASE_URL
  );
  databaseManager.init();
  return databaseManager;
};

DatabaseManager.prototype.init = function(){
  this.mongoClient.connect(this.databaseUrl, function(err, db){
    assert.equal(null, err);
    console.log("Connected to Mongo Server correctly!");
    db.close();
  });
};

DatabaseManager.prototype.register = function(username , password, callback){
  this.mongoClient.connect(this.databaseUrl, function(err, db){
    assert.equal(null, err);
    bcrypt.hash(password, 10, function(err , hash){
      assert.equal(null, err);
      db.collection(DatabaseManager.USERS).insert({
        username:username,
        password:hash
      }, function(err, result){
        if(err){
          if(callback) callback(err);
          return;
        }else{
          console.log(result);
          if(callback) callback(null);
          return;
        }
      });
    });
  });
};

DatabaseManager.prototype.auth = function(username, password, callback){
  this.mongoClient.connect(this.databaseUrl, function(err, db){
    assert.equal(null, err);
    db.collection(DatabaseManager.USERS).findOne({username:username},
    function(err, doc){
      assert.equal(null, err);
      if(!doc) {callback("User not found.", false); return;}
      bcrypt.compare(password, doc.password, function(err, res){
        if(callback) callback(err, res);
      })
    });
  })
}

// DatabaseManager.prototype

module.exports = DatabaseManager;
