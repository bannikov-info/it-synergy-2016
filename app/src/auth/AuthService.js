;(function () {
    "use strict";

    var module = angular.module('auth', []);

    module
        .provider('AuthIntrceptor', AuthIntrceptorProvider)
        .service('SessionService', SessionService)
        .constant('AUTH_EVENTS', {
            authError: 'auth:auth-error',
            sessionInit: 'auth:session-init',
            sessionReject: 'auth:session-reject'
        })
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push('AuthIntrceptor');
        }]);


    function AuthIntrceptorProvider() {
        return {
            $get: function($q, $injector, $location, $window, $rootScope, AUTH_EVENTS){
                return {
                    responseError: function (response) {
                        console.log('AuthIntrceptorProvider: '+response.status);
                        if ((response.status === 401) || (response.status === 403)){
                            // console.log(());
                            $rootScope.$broadcast(AUTH_EVENTS.authError, response, $window.location.href);
                        }

                        return $q.reject(response);
                    }
                }
            }
        }
    };

    SessionService.$inject = ['$q', '$http', '$window', '$rootScope', 'AUTH_EVENTS'];
    function SessionService($q, $http, $window, $rootScope, AUTH_EVENTS) {
        return {
            sessionInit: function (credentials, uriConfig) {

                var uriConfig = uriConfig || {};
                uriConfig['sessionInitMethodURI'] = uriConfig['sessionInitMethodURI'] || '/login';

                var defer = $q.defer();
                var credentials = angular.copy(credentials);

                $http
                    .post(uriConfig.sessionInitMethodURI,
                        {
                            username: credentials.username,
                            password: credentials.password
                        })
                    .then(
                        function (resp) {
                            $rootScope.$broadcast(AUTH_EVENTS.sessionInit, resp);
                            defer.resolve(resp);
                        },
                        function (err) {
                            $rootScope.$broadcast(AUTH_EVENTS.sessionReject, err)
                            defer.reject(err);
                        }
                    );

                return defer.promise;

            }
        };
    }
})();
