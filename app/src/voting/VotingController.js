(function(){
"use strict";
  angular
       .module('voting', [])
       .controller('VotingController', ['$scope', '$mdDialog', VotingController]);

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function VotingController($scope, $mdDialog) {
    var self = this;
    self.vote = [];

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

    self.showQr = function (ev) {
        $mdDialog.show({
          controller: DialogController,
          controllerAs: 'ctrl',
          templateUrl: '/app/assets/parts/dialogs/show-qr.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: true
      });

      function DialogController($location) {
          this.qrText = $location.absUrl();
      }
    }

  };

})();
