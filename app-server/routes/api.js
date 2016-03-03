var db = require('../models');
var restful = require('sequelize-restful');

module.exports = restful(db.sequelize,{
    endpoint: '/',
    allowed: [db.User.name,
              db.Project.name,
              db.File.name]
});
