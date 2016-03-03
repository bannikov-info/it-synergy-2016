var nconf = require('nconf');
var path = require('path');

nconf.argv()
     .env()
     .file('./config.json');

nconf.default({
    project_uploads: './uploads'
})

module.exports = nconf;
