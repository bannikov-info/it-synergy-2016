(function(){
"use strict";
  angular
       .module('voting')
       .controller('VotingController', ['$scope', '$mdDialog', 'votingService', 'userService' , 'projectsService', VotingController]);

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function VotingController($scope, $mdDialog, votingService, userService, projectsService) {
    var self = this;
    self.vote = [];
    self.projects = [];

    self.projects = projectsService.getAllProjects({}, function () {
        // debugger;
    });

    self.hasVote = function (shemeNum) {
        return self.vote.indexOf(shemeNum) >= 0;
    };

    self.getFavoriteIcon = function (a) {
        return self.hasVote(a) ? 'favorite24v' : 'favorite24';
    };

    self.changeVote = function (a) {
        console.log("changeVote: ", a);
        var i = self.vote.indexOf(a);
        console.log(i);
        if(i >= 0){
            self.vote.splice(i,1);
        }else{
            self.vote.push(a);
        }
        console.log(self.vote);
    };

    $scope.showQr = function (ev) {
        $mdDialog.show({
          controller: DialogController,
          controllerAs: 'ctrl',
          templateUrl: './assets/parts/dialogs/show-qr.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: false
      });

      function DialogController($location) {
          this.qrText = $location.absUrl();
      }
    }

  };

})();
