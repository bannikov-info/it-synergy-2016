var express = require('express');
var router = express.Router();
var debug = require('debug')('app-server:auth');
var auth = require('../middlewares/auth');
// var passport = require('passport');

/* GET users listing. */
router.post('/login',
    function (req, res, next) {
        // body...
        debug('post /login');
        debug(req.body);
        next();
    },
    auth.a14n.authenticate('local'),
    function(req, res) {
        res.sendStatus(200);
    }
);

module.exports = router;
