;(function () {
    var module = angular.module('app');

    module.controller('IndexController', [
                        '$scope',
                        '$location',
                        IndexController
                    ]);

    function IndexController($scope, $location) {
        console.log('IndexController');
        $scope.location = $location.path.bind($location);
    }
}());
