;(function () {
    'use strict';

    angular.module('projects', [])
        .service('projectsService', ['$q', ProjectsService]);

    function ProjectsService($q){
        var projects = [];
        for(var i = 1;i<=7;i++){
            projects[i-1] = {
                projectName: "Project #"+i,
                shemeUrl: "/img/project"+i+".png"
            }
        }

        return {
            getProjects : function () {
                return $q.when(projects);
            }
        }
    }
})();
