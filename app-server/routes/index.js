var express = require('express');
var router = express.Router();
var auth = require('../middlewares/auth');

/* GET home page. */
router.get('/',
  function(req, res, next) {
      res.render('index', { title: 'Express' });
    // res.status(401);
    // console.log('/user ....');
    // res.sendStatus(401);
  }
);

module.exports = router;
