var express = require('express');
var router = express.Router();
var auth = require('../middlewares/auth');
var debug = require('debug')('app-server:users');
var users = require('../models/users');

/* GET users listing. */
router.get('/current', function(req, res, next) {
  res.send(req.user);
});

module.exports = router;
