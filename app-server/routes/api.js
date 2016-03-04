var express = require('express');
var router = express.Router();
var db = require('../models');
var File = db.File;
var debug = require('debug')('app-server:api');

router.get('/img/:img_name',
    function (req, res, next) {
        File.findOne({where: {mimetype: {$like: 'image/%'}, filename: req.params.img_name}})
            .then(
                function (img) {
                    if(!!img){
                        res.set('Conten-Type', img.mimetype);
                        res.set('Content-Length', img.size);
                        res.sendFile(img.path)
                    }else{
                        next();
                    }
                },
                next
            )
    }
)

module.exports = router;
