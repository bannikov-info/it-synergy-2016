
var Project = require('../models').Project;
var debug = require('debug')('app-server:middlewares');

debug('project-resolver require');

module.exports = function (options) {
    debug('project-resolver init');
    return middleware.bind(this, options);
}
function middleware (options, req, res, next) {
    debug('project-resolver()');
    var proj_id = req.params.proj_id;

    options = options || {};
    if (proj_id === 'me' && !!req.user){
        proj_id = req.user.ProjectId;
    };

    if(!!proj_id){

        Project.findById(proj_id).then(
            function (proj) {
                if(!!proj){
                    debug('project found');
                    req.project = proj;
                    return next();
                }else if(!!options.require){
                    debug('project not found, send status 404');
                    return res.sendStatus(404);
                }

                debug('project not found');
                return next();
            },
            function (err) {
                debug('project search error')
                return next(err);
            }
        );

    }else{
        debug('proj_id not defined')
        if(!!options.require){
            debug('project not found, send status 404');
            return res.sendStatus(404);
        }else{
            return next();
        }
    }
}
