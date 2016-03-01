;(function (angular) {
    // console.log(!!angular);
    angular
        .module('starterApp', ['ngMaterial', 'users', 'ngRoute', 'voting',
                               'ja.qr', 'projects', 'auth'])
        .config(function($mdThemingProvider, $mdIconProvider, $routeProvider, SessionServiceProvider){

            $mdIconProvider
                .defaultIconSet("./assets/svg/avatars.svg", 128)
                .icon("menu"       , "./assets/svg/menu.svg"        , 24)
                .icon("share"      , "./assets/svg/share.svg"       , 24)
                .icon("google_plus", "./assets/svg/google_plus.svg" , 512)
                .icon("hangouts"   , "./assets/svg/hangouts.svg"    , 512)
                .icon("twitter"    , "./assets/svg/twitter.svg"     , 512)
                .icon("phone"      , "./assets/svg/phone.svg"       , 512)
                .icon("favorite24" , "./assets/svg/ic_favorite.svg" , 24)
                .icon("favorite24v" , "./assets/svg/ic_favorite_vote.svg" , 24)
                .icon("qr" , "./assets/svg/ic_pages_black_48px.svg" , 48);

                $mdThemingProvider.theme('default')
                    .primaryPalette('green')
                    .accentPalette('yellow');

                $routeProvider
                    .when('/', {
                        templateUrl: './assets/parts/index.html'
                    })
                    .when('/users', {
                        controller: 'UserController',
                        controllerAs: 'ul',
                        templateUrl: './assets/parts/users/index.html'
                    })
                    .when('/voting',{
                        templateUrl: './assets/parts/voting/index.html',
                        controller: 'VotingController',
                        controllerAs: 'ctrl',
                        resolve: {
                            // 'user': 'userService'
                        }
                    })
                    .when('/login', {
                        templateUrl: './assets/parts/auth/login.html'
                    })
                    .otherwise({
                        redirectTo: '/voting'
                    });

            var $injector = angular.injector(['ng']),
                $q = $injector.get('$q'),
                $window = $injector.get('$window');

            SessionServiceProvider.setShowLoginDialog(defaultShowLoginDialog);

            function defaultShowLoginDialog(credentialsInit) {
                var defer = $q.defer();

                var credentialsObj = credentialsInit || {};
                var cred = Object.keys(credentialsObj).map(function (val) {
                    return credentialsObj[val];
                }).join(':');

                cred = $window.prompt('Credentials', cred);

                if(!!cred){
                    var user,pass;
                    [user, pass] = cred.split(':');
                    // debugger;
                    defer.resolve({credentials: {username:user, password: pass}});
                }else {
                    defer.reject('No credentials');
                }

                return defer.promise;
            };

        });
}(angular));
