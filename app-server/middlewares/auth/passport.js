var passport = require('passport'),
    LocalStartegy = require('passport-local').Strategy;
var debug = require('debug')('app-server:auth');
var User = require('../../models').User;

passport.use(new LocalStartegy(
    function (username, password, done) {
        debug('LocalStrategy...');
        if (!username){
            debug('username not defined')
            return done(null, false);
        };
        var user = User.findOne({where:{ldap_id: username}}).then(
            function (usr) {
                if (!usr){
                    debug('user not found');
                    return done(null, false);
                }

                debug('user found');
                return done(null, usr);
            }
        );
        // return done(null, false);
    }
));



passport.serializeUser(function (usr, done) {
    debug('serializeUser: ', usr);
    done(null, usr.id);
});
passport.deserializeUser(function (id, done) {
    debug('deserializeUser: ',id);
    done(null, User.findById(id));
});

module.exports = passport;
