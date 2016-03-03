var express = require('express');
var router = express.Router();
var debug = require('debug')('app-server:project');
var Project = require('../models').Project;

/* GET users listing. */

router.get('/', function (re, res, next) {
    Project.findAll().then(
        function (proj) {
            // console.dir(users)
            res.json(proj.map(function (projInst) {
                return projInst.toJSON();
            }));
        },
        function (err) {
            next(err);
        }
    )
});

router.get('/:project_name', function (req, res, next) {
    // body...
    Project.findOne({where: {project_name: req.params.project_name}})
        .then(
            function (proj) {
                if(!proj){
                    res.sendStatus(404);
                }else{
                    res.json(proj.toJSON());
                }
            },
            function (err) {
                next(err);
            }
        )
})

module.exports = router;
