var express = require('express');
var router = express.Router();
var auth = require('../middlewares/auth');
var debug = require('debug')('app-server:users');
var User = require('../models').User;

/* GET users listing. */
router.get('/current', function(req, res, next) {
  res.send(req.user.toJSON);
});

router.get('/', function (re, res, next) {
    User.findAll().then(
        function (users) {
            // console.dir(users)
            res.send(users.map(function (usrInst) {
                return usrInst.toJSON();
            }));
        },
        function (err) {
            next(err);
        }
    )
})

module.exports = router;
