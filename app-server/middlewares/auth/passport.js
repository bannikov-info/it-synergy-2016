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

        User.findOne({where:{ldap_id: username}})
        .then(
            function (usr) {
                if (!usr){
                    debug('user not found');
                    return done(null, false, {message: 'user '+username+' not found'});
                }else{
                    debug('user found');
                    return done(null, usr);
                }
            },
            function (err) {
                debug('user search error: ', err);
                return done(err, false);
            }
        );
    }
));



passport.serializeUser(function (usr, done) {
    debug('serializeUser: ', usr);
    done(null, usr.id);
});
passport.deserializeUser(function (id, done) {
    debug('deserializeUser: ',id);
    // done(null, User.findById(id);
    User.findById(id).then(
        function (usr) {
            if(!usr){
                done(null, false, {message: 'user '+id+' not found'});
            }else{
                done(null, usr);
            }
        },
        function (err) {
            done(err, false);
        }
    )
});

module.exports = passport;
