var express = require('express');
var router = express.Router();
var debug = require('debug')('app-server:auth');
var auth = require('../middlewares/auth');
// var passport = require('passport');

/* GET users listing. */
router.post('/login',
    auth.a14n.authenticate('local'),
    // passport.authenticate('local'),
    function(req, res) {
        var redirectURI = req.body.sessionInitSuccessRedirectURI || '/';
        res.set('Location', redirectURI);
        res.sendStatus(201);
    }
);

module.exports = router;
