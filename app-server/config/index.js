var nconf = require('nconf');
var path = require('path');

nconf.argv()
     .env()
     .file('./config.json');

nconf.defaults({
    project_uploads: './uploads'
})

module.exports = nconf;
