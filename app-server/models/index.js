"use strict";
var debug = require('debug')('app-server:models');
var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var env       = process.env.NODE_ENV || "development";
var path      = require('path');
// var config    = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
// var sequelize = new Sequelize(config.database, config.username, config.password, config);
var sequelize = new Sequelize('it-synegy', null, null, {
    dialect: 'sqlite',
    storage: path.resolve(__dirname, './.db/app-server.sqlite')
});
var db        = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (~file.indexOf(".js")) && (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    console.log(model.name);
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (("associate" in db[modelName]))
  {
      db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
