var ConnectRoles = require('connect-roles');

var uRoles = new ConnectRoles({
  failureHandler: function (req, res, action) {
    // optional function to customise code that runs when
    // user fails authorisation
    var accept = req.headers.accept || '';
    res.status(403);
    res.send('Access Denied - You don\'t have permission to: ' + action);
    // if (~accept.indexOf('html')) {
    //   res.render('access-denied', {action: action});
    // } else {
    //   res.send('Access Denied - You don\'t have permission to: ' + action);
    // }
  }
});

uRoles.use('public level', function (req) {
    return true;
});

uRoles.use('moderator level', function (req) {
    if(!!req.user){
        return req.user.hasRole('moderator');
    }
    return false;
});

uRoles.use('admin level', function (req) {
    if(!!req.user){
        return req.user.hasRole('admin');
    };

    return false;
});

uRoles.use('user level', function (req) {
    if(!!req.user){
        return req.user.hasRole('user');
    };

    return false;
});

module.exports = uRoles;
