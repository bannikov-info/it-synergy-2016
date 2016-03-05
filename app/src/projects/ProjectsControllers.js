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
    };
}())
