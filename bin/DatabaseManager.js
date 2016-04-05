var mongodb = require('mongodb');
var bcrypt = require('bcrypt');
var assert = require('assert');

DatabaseManager.DATABASE_URL = process.env.DATABASE_URL ||
  'mongodb://localhost:27017/ayyyyylmao';
DatabaseManager.USERS = 'users';

function DatabaseManager(mongoClient, databaseUrl){
  this.mongoClient = mongoClient;
  this.databaseUrl = databaseUrl;
};

DatabaseManager.create = function(){
  var databaseManager = new DatabaseManager(
    mongodb.mongoClient, DatabaseManager.DATABASE_URL
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

DatabaseManager.prototype
