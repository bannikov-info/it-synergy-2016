var Project = require('../models').Project;

module.exports = function (options) {
    return middleware.bind(this, options);
}
function middleware (options, req, res, next) {
    var proj_id = req.params.proj_id;

    options = options || {};
    if (proj_id === 'me' && !!req.user){
        proj_id = req.user.project_id;
    };

    if(!!proj_id){

        Project.findById(proj_id).then(
            function (proj) {
                if(!!proj){
                    req.project = proj;
                    return next();
                }else if(!!options.require){
                    return res.sendStatus(404);
                }


                return next();
            },
            function (err) {
                return next(err);
            }
        );

    }else{
        return next();
    }
}
