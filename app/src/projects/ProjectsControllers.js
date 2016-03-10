;(function () {
    var module = angular.module('projects');
    module
        .controller('ProjectsIndexController',
            ['projectsService',
             ProjectsIndexController
         ]);

    function ProjectsIndexController(projectsService) {
        // debugger;
        var self = this;

        self.projects = [];
        self.projects = projectsService.getAllProjects({}, function () {
            // debugger;
        });

        self.uploadFileToProject = function (file, proj_id, ev) {
            // debugger;
            if(!!file){
                console.log('file change: '+file.name);
                console.log(file);
                projectsService.uploadFile({proj_id: proj_id}, {scheme: file},
                    function (resp) {
                        // body...
                        console.log('upload success: ');
                        console.log(resp);
                    },
                    function (resp) {
                        console.log('upload fail:');
                        console.log(resp);
                    }
                )
            }
        }
    };
}())
