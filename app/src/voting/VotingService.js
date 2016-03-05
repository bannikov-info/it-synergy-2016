;(function () {
    'use strict';
    angular.module('voting')
        .service('votingService', ['$q', 'projectsService', VotingService]);

    function VotingService($q, projectsService) {
        return {
            getVoting: function () {
                return $q.when(new Voting('Голосование 1'));
            }
        }

        function Voting(name) {
            this.votingName = name;
            this.projects = projectsService
        };
    }
})();
