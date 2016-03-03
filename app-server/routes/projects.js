var express = require('express');
var router = express.Router();
var debug = require('debug')('app-server:project');
var Project = require('../models').Project;
var project_resolver = require('../middlewares/project-resolver');
var url = require('url');
var File = require('./models').File;
var config = require('../config');
var fs = require('fs');

/* GET users listing. */

var appRoot = global.appRoot || __dirname;
var upload_folder = path.resolve(appRoot, config.get('project_uploads'));
var upload = require('multer')({dest: upload_folder});

router.get('/', function (req, res, next) {
    Project.findAll().then(
        modelsCollectionToJSON.bind(this, res, null),
        next
    )
});

router.post('/new',
    function (req, res, next) {
        debug(req.body);
        var newProject = Project.build(req.body.project);

        if(!!req.user){
            newProject.addMember(req.user);

        };

        newProject.save().then(
            function (newProject) {
                res.set('Location', url.resolve(req.baseUrl+'/', newProject.id+''));
                res.sendStatus(201);
            },
            next
        );


    }
);

router.delete('/:proj_id',
    project_resolver({require: true}),
    function (req, res, next) {
        req.project.destroy().then(
            function () {
                res.send();
            },
            next
        )
    }
)

router.get('/:proj_id',
    project_resolver({require: true}),
    function (req, res, next) {
        res.json(req.project.toJSON());
    }
);

router.get('/:proj_id/members',
    project_resolver({require: true}),
    function (req, res, next) {
        req.project.getMember().then(
            modelsCollectionToJSON.bind(this, res, null),
            next
        );
    }
);

router.get('/:proj_id/images',
    project_resolver({require: true}),
    function (req, res, next) {
        req.project.getFiles({where: {mimetype: {$like: 'image/%'}}})
            .then(
                modelsCollectionToJSON.bind(this, res, null),
                function (err) {
                    debug(err);
                    next(err);
                }
            );
    }
);

router.post('/:proj_id/images',
    project_resolver({require: true}),
    function (req, res, next) {

    }
)

module.exports = router;

function modelsCollectionToJSON(res, jsonOptions, models) {
    return res.json(models.map(function (model) {
        return model.toJSON(jsonOptions);
    }));
}
