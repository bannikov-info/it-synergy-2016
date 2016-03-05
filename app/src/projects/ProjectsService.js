;(function () {
    'use strict';

    angular.module('projects')
        .service('projectsService', ['$q', '$resource', ProjectsService]);

    function ProjectsService($q, $resource){
        var projResource = $resource('/projects/:proj_id',
            {proj_id: 'me'},
            {
                getAllProjects: {
                    method: 'GET',
                    isArray: true,
                    params:{
                        proj_id: null
                    },
                    transformResponse: function(data, headers, status){
                        if(status === 200){
                            var data = JSON.parse(data);
                            if (data instanceof Array){
                                return data.map(function (projectModel) {
                                    Object.defineProperty(projectModel, 'schemeUrl', {
                                        enumerable:true,
                                        get: function () {
                                            // console.log('get project images');
                                            return projResource.getProjectImages({proj_id: projectModel.id});
                                        }
                                    });

                                    return projectModel;
                                });
                            }else{
                                throw new TypeError('expected array data');
                            }
                        }
                    }
                },
                getProjectImages:{
                    method: 'GET',
                    url: 'projects/:proj_id/images',
                    isArray: true,
                    transformResponse: function (jsonData, headers, status) {
                        if(status === 200){
                            var data = JSON.parse(jsonData);
                            if (data instanceof Array){
                                var res = data.map(function(imgModel){
                                    // console.log(imgModel);
                                    return {
                                        url: imgModel.uri
                                    };
                                });
                                return res;
                            }else{
                                throw new TypeError('expected array data');
                            }
                        }

                        return null;
                    }
                },
                postSchemeImage: {
                    method: 'POST',
                    url: '/projects/:proj_id/images/upload'
                }
            }
        );

        return projResource;
    }
})();
