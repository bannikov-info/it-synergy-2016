;(function () {
    "use strict";

    var module = angular.module('auth', []);

    module
        .provider('AuthIntrceptor', AuthIntrceptorProvider)
        .provider('SessionService', SessionServiceProvider)
        .config(['$httpProvider', function ($httpProvider) {
            // console.log('configure $httpProvid');
            $httpProvider.interceptors.push('AuthIntrceptor');
        }]);

    function AuthIntrceptorProvider() {
        return {
            $get: function($q, $injector, $location, $window){
                return {
                    responseError: function (response) {
                        if ((response.status === 401) || (response.status === 403)){

                            var SessionService = $injector.get('SessionService');

                            var defer = $q.defer();

                            SessionService
                                .sessionInit(
                                    {
                                        username: 'eugene',
                                        password: 'passwd'
                                    }
                                    ,{
                                        sessionInitSuccessRedirectURI: $window.location.href
                                    }
                                ).then(
                                    function (resp) {
                                        defer.resolve(response.config);
                                    },
                                    function (err) {
                                        defer.reject(response.config);
                                    }
                                )

                            return defer.promise;

                            // return
                        }

                        return $q.reject(response);
                    }
                }
            }
        }
    };

    function SessionServiceProvider() {
        // body...
        var showLoginDialog = null;

        return {
            setShowLoginDialog: function (showLoginDialogFn) {
                showLoginDialog = showLoginDialogFn;
            },
            $get: function ($q, $http, $window) {
                function getShowLoginDialog(){
                    return showLoginDialog;
                };

                return {
                    sessionInit: function (credentials, uriConfig) {

                        var uriConfig = uriConfig || {};
                        uriConfig['sessionInitMethodURI'] = uriConfig['sessionInitMethodURI'] || '/login';

                        var loginDialog = getShowLoginDialog() || function () {
                                console.log('call default showLoginDialog handler');
                                return $q.reject();
                            };
                        var defer = $q.defer();

                        loginDialog(credentials).then(
                            function (response) {
                                console.log('login prompt success');

                                defer.resolve(
                                    (function($http){
                                        var resolveDefer = $q.defer()

                                        $http
                                            .post(uriConfig.sessionInitMethodURI,
                                                {
                                                    username: response.credentials.username,
                                                    password: response.credentials.password,
                                                    sessionInitSuccessRedirectURI: [uriConfig.sessionInitSuccessRedirectURI].join('/')
                                                })
                                            .then(
                                                function (resp) {
                                                    console.log('login success');
                                                    if(resp.status === 201){
                                                        var newLocation = resp.headers('Location');
                                                        if ($window.location.href === newLocation){
                                                            $window.location.reload(true);
                                                        }else{
                                                            $window.location.href = resp.headers('Location');
                                                        }
                                                        resolveDefer.reject();
                                                    }else{
                                                        resolveDefer.resolve(resp);
                                                    }

                                                },
                                                function (err) {
                                                    console.log('login failed');
                                                    resolveDefer.reject(err);
                                                }
                                            )


                                        return resolveDefer.promise;
                                        // return
                                    })($http)
                                    )
                            },
                            function (err) {
                                console.log('login prompt failed');
                                defer.reject(err);
                            }
                        );

                        return defer.promise;

                        // return $q(function (resolve, reject) {
                        //
                        // })

                    }
                };
            }
        }
    }

})();
