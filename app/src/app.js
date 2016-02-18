;(function (angular) {
    angular
        .module('starterApp', ['ngMaterial', 'users', 'ngRoute'])
        .config(function($mdThemingProvider, $mdIconProvider, $routeProvider){

            $mdIconProvider
                .defaultIconSet("./assets/svg/avatars.svg", 128)
                .icon("menu"       , "./assets/svg/menu.svg"        , 24)
                .icon("share"      , "./assets/svg/share.svg"       , 24)
                .icon("google_plus", "./assets/svg/google_plus.svg" , 512)
                .icon("hangouts"   , "./assets/svg/hangouts.svg"    , 512)
                .icon("twitter"    , "./assets/svg/twitter.svg"     , 512)
                .icon("phone"      , "./assets/svg/phone.svg"       , 512)
                .icon("favorite24" , "./assets/svg/ic_favorite.svg" , 24);

                $mdThemingProvider.theme('default')
                    .primaryPalette('brown')
                    .accentPalette('red');

                $routeProvider
                    .when('/', {
                        templateUrl: './assets/parts/index.html'
                    })
                    .when('/users', {
                        controller: 'UserController',
                        controllerAs: 'ul',
                        templateUrl: './assets/parts/users/index.html'
                    })
                    .otherwise({
                        redirectTo: '/'
                    })

        });
}(angular));
