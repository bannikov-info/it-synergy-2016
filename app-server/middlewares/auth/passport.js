var passport = require('passport'),
    LocalStartegy = require('passport-local').Strategy;

var users = require('../../models/users');
var User = users.User;
var debug = require('debug')('app-server:auth');

passport.use(new LocalStartegy(
    function (username, password, done) {
        if (!users[username]){
            debug("Не корректное имя пользователя.");
            return done(null, false, {message: "Не корректное имя пользователя."});
        };

        return done(null, new User(users[username]));
    }
));



passport.serializeUser(function (usr, done) {
    debug('serializeUser: ', usr);
    done(null, usr.username);
});
passport.deserializeUser(function (id, done) {
    debug('deserializeUser: ',id);
    done(null, users[id]);
})

module.exports = passport;
