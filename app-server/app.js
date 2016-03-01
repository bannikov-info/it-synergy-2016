var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var auth = require('./middlewares/auth');
var passport = require('passport');
var LocalStartegy = require('passport-local').Strategy;

var usersModel = require('./models/users');
var User=usersModel.User;

// passport.use(new LocalStartegy(
//     function (username, password, done) {
//         debug('a14n ', arguments);
//         if (!usersModel[username]){
//             debug("Не корректное имя пользователя.");
//             // debug(users);
//             return done(null, false, {message: "Не корректное имя пользователя."+username});
//         };
//
//         var usr = new User(usersModel[username]);
//         debug(usr);
//         return done(null, usr);
//     }
// ));
//
// passport.serializeUser(function (usr, done) {
//     debug('serializeUser: ', usr.username);
//     done(null, usr.username);
// });
// passport.deserializeUser(function (id, done) {
//     debug('deserializeUser: ',id);
//     done(null, usersModel[id]);
// });



var authRoutes = require('./routes/auth');
var users = require('./routes/users');
var session = require('express-session');
var flash = require('connect-flash');

var debug = require('debug')('app-server:app');

// console.dir(auth);

var app = express();

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

// app.use(passport.initialize());
// app.use(passport.session());

var routes = require('./routes/index');

// app.use(function (req, res, next) {
//     debug('before passport.initialize()');
//     debug(req.body);
//     next();
// });

app.use(auth.a14n.initialize());
app.use(auth.a14n.session());
app.use(auth.a13n.middleware());

app.use('/users', auth.a13n.is('user level'), users);
app.use(auth.a13n.is('public level'), authRoutes);

// app.use('/users', auth.passport.authenticate('local'), users);
// debug(auth);

app.use('/',
    // auth.authenticate('local', {failureRedirect: '/login'}),
    auth.a13n.is('public level'),
    express.static(path.resolve(__dirname, '../app')
));


app.use('/api', express.static(path.resolve(__dirname, '../api')));


// app.use('/', routes);

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


module.exports = app;
