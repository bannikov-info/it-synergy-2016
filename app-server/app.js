global.appRoot = __dirname;

var express = require('express');
var path = require('path');
var url = require('url');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var auth = require('./middlewares/auth');
var authRoutes = require('./routes/auth');

var users = require('./routes/users');
var session = require('express-session');
var flash = require('connect-flash');

var debug = require('debug')('app-server:app');


// console.dir(auth);

var app = express();
var db=require('./models');

var isDev = process.env.NODE_ENV === 'development';
debug('NODE_ENV: '+process.env.NODE_ENV);

db.sequelize.sync({force: isDev})
    .then(function () {
        if(isDev){
            InitDevDB()
        };

        return this;
    })
    .then(function () {
        debug('db.sync() successfull...');
        // debug(arguments);
        // view engine setup
        app.set('views', path.join(__dirname, 'views'));
        app.set('view engine', 'jade');

        // uncomment after placing your favicon in /public
        //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
        app.use(logger('dev'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(cookieParser());
        app.use(session({secret: 'aaabbbccc'}));
        app.use(flash());

        var routes = require('./routes/index');

        app.use(auth.a14n.initialize());
        app.use(auth.a14n.session());
        app.use(auth.a13n.middleware());

        app.use('/users', auth.a13n.is('user level'), users);
        app.use(auth.a13n.is('public level'), authRoutes);
        app.use('/projects',
            auth.a13n.is('user level'),
            require('./routes/projects'));

        app.use('/',
            // auth.authenticate('local', {failureRedirect: '/login'}),
            auth.a13n.is('public level'),
            express.static(path.resolve(appRoot, '../app')
        ));

        app.use('/api',
            auth.a13n.is('user level'),
            require('./routes/api'),
            express.static(path.resolve(appRoot, '../api'))
        );

        // catch 404 and forward to error handler
        app.use(function(req, res, next) {
          var err = new Error('Not Found');
          err.status = 404;
          next(err);
        });

        // error handlers

        // development error handler
        // will print stacktrace
        if (app.get('env') === 'development') {
          app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
              message: err.message,
              error: err
            });
          });
        }

        // production error handler
        // no stacktraces leaked to user
        app.use(function(err, req, res, next) {
          res.status(err.status || 500);
          res.render('error', {
            message: err.message,
            error: {}
          });
        });

        // debug(app._router.stack);
    }
    ,function (err) {
        debug('db.sync() error:\n', err)
    }
)


module.exports = app;

function InitDevDB() {
    var User = db.User;
    // var eugene = User.create({firstName: 'Eugene', ldap_id: 'eugene', roles: (2)});
    // var moderator = User.create({firstName: 'moderator', ldap_id: 'moderator', roles: (2|4)});
    var admin = User.create({firstName: 'admin', ldap_id: 'admin', roles: (User.getRoleCode('admin')|User.getRoleCode('moderator')|User.getRoleCode('user'))});

    var Project = db.Project;
    var File = db.File;

    Array.apply(null, {length: 10})
        .forEach(function (val, idx) {
            // var idx = idx+1;
            Project.create({name: 'Project_'+idx}).then(
                function (proj) {
                    User.create({
                        firstName: 'eugene'+(idx ? idx : ''),
                        ldap_id: 'eugene'+(idx ? idx : ''),
                        roles: User.getRoleCode('user')
                    }).then(function (user) {
                        proj.addMember(user);
                    });
                    User.create({
                        firstName: 'moderator'+(idx ? idx : ''),
                        ldap_id: 'moderator'+(idx ? idx : ''),
                        roles: User.getRoleCode('moderator') | User.getRoleCode('moderator')
                    }).then(function (user) {
                        // debug(proj);
                        proj.addMember(user);
                    });

                    var imgFileName = ['project',proj.id,'.png'].join('');
                    File.create({
                        filename: imgFileName,
                        originalname: imgFileName,
                        path: path.resolve(global.appRoot, '../api/img/'+imgFileName),
                        size: 0,
                        mimetype: 'image/png',
                        uri: url.resolve('/api/img/', imgFileName)
                    }).then(
                        function (img) {
                            proj.addFile(img);
                        }
                    )
                }
            );
        });
}
