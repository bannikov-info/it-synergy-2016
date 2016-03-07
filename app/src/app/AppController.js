;(function () {
    var module = angular.module('app');

    module
        .controller('AppController', AppController)
        // .controller('LoginController', LoginController);

    AppController.$inject = ['$rootScope', '$scope', '$mdDialog', 'AUTH_EVENTS', 'SessionService', '$window', '$location'];
    function AppController($rootScope, $scope, $mdDialog, AUTH_EVENTS, SessionService, $window, $location) {
        // body...
        $scope.$on(AUTH_EVENTS.authError,     authErrorHandler);
        $scope.$on(AUTH_EVENTS.sessionInit,   sessionInitHandler);
        $scope.$on(AUTH_EVENTS.sessionReject, sessionRejectHandler)

        var self = this;
        self.showQr = function (ev) {
            $mdDialog.show({
              controller: DialogController,
              controllerAs: 'ctrl',
              templateUrl: './assets/parts/dialogs/show-qr.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose:true,
              fullscreen: false
          });

          DialogController.$inject=['$location']
          function DialogController($location) {
              this.qrText = $location.absUrl();
          }
        }

        function sessionInitHandler(ev, resp, locationUri) {
            if(resp.status == 200){
                $window.location.href = locationUri;
                $window.location.reload(true);
            };
        };

        function sessionRejectHandler(ev, error) {
            console.log(ev.name);

            $location.path('/');

            // $window.location.reload(true);
        }

        function authErrorHandler (ev, response, locationUri) {
            console.log(ev.name);
            $mdDialog.show({
                templateUrl: '/assets/parts/dialogs/login.html',
                controller: LoginController,
                locals: {
                    credentials: {
                        username: 'eugene',
                        password: 'password'
                    }
                },
                fullscreen: true
            }).then(
                function (credentials) {
                    // debugger;
                    SessionService.sessionInit(credentials, {sessionInitSuccessRedirectURI: locationUri}).then(
                        function (resp) {
                            $rootScope.$broadcast(AUTH_EVENTS.sessionInit, resp);
                        },
                        function (err) {
                            $rootScope.$broadcast(AUTH_EVENTS.sessionReject, err);
                        }
                    )
                },
                function (err) {
                    $rootScope.$broadcast(AUTH_EVENTS.sessionReject, err);
                }
            )

            // LoginController.$inject = ['$scope', '$mdDialog'];
            function LoginController($scope, $mdDialog, credentials) {
                // body...
                $scope.credentials = credentials;
                // debugger;
                $scope.done = function (credentials) {
                    // debugger;
                    $mdDialog.hide(credentials);
                    return false;
                };

                $scope.cancel = function () {
                    $mdDialog.cancel();
                }
            }
        }


    };


}())
