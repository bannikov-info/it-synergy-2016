;(function () {
    var module = angular.module('projects');
    module
        .controller('ProjectsIndexController', ProjectsIndexController)
        .controller('ProjectController', ProjectController);

    ProjectsIndexController.$inject = ['projectsService'];
    function ProjectsIndexController(projectsService) {
        // debugger;
        var self = this;

        self.projects = [];
        self.projects = projectsService.getAllProjects({}, function () {
            // debugger;
        });


    };

    ProjectController.$inject=['$scope', 'projectsService', '$location', '$routeParams', 'GDrive', '$mdDialog', '$document'];
    function ProjectController($scope, projectsService, $location, $routeParams, GDrive, $mdDialog, $document) {
        // body...
        var self = this;

        if(!!$routeParams.proj_id){
            projectsService.get({proj_id: $routeParams.proj_id},
                function (project) {
                    console.log('fetch project object');
                    $scope.project = project
                },
                function (err) {
                    // body...
                    console.log('fetch project object error:');
                    console.log(err);
                }
            )
        };

        self.uploadFileToProject = function (file, proj_id, ev) {
            // debugger;
            if(!!file){
                console.log('file change: '+file.name);
                console.log(file);
                projectsService.uploadFile({proj_id: proj_id}, {scheme: file},
                    function (resp) {
                        // body...
                        console.log('upload success: ');
                        console.log(resp);
                    },
                    function (resp) {
                        console.log('upload fail:');
                        console.log(resp);
                    }
                )
            }
        };

        $scope.goProject = function (proj_id) {
            $location.path('/projects/'+proj_id);
        };

        $scope.onPicked = function (docs) {
            console.log(arguments)
            angular.forEach(docs,function (fileObj, idx) {
                GDrive.downloadFile(fileObj.id).then(
                    function (file) {
                        // body...
                        console.log('resolve:');
                        console.log(file);
                    },
                    function (err) {
                        // body...
                        console.log('error:');
                        console.log(err);
                    }
                )
            })
        };

        $scope.showImage = function (imgSrc, ev) {
            console.log('show image:');
            console.log(arguments);

            // duild dialog preset options
            var presetOptions = {
                templateUrl: './assets/parts/dialogs/img-gallery.html',
                autoWrap: false,
                targetEvent: ev,
                locals: {
                    imgSrc: imgSrc
                },
                bindToController: true,
                controller: GalleryController,
                controllerAs: 'gallery',
                fullscreen: true
            };

            // show gallery dialog
            $mdDialog.show(presetOptions).then(
                function (resp) {
                    console.log('success');
                    console.log(resp);
                },
                function (err) {
                    console.log('fail');
                    console.log(err);
                }
            );
        }

        GalleryController.$inject = ['$scope', '$mdDialog'];
        function GalleryController($scope, $mdDialog) {
            this.close = function (ev) {
                $mdDialog.cancel();
                ev.preventDefault();
                ev.stopPropagation();
            }

            this.clickHandler = function (ev) {
                // body...
                var el = ev.currentTarget;

                toggleFullscreen(el);

                ev.stopPropagation();
                ev.preventDefault();
            }

            function toggleFullscreen(el) {
                var doc = $document[0];
                var fsElement = doc.fullscreenElement ||
	                            doc.webkitFullscreenElement ||
	                            doc.mozFullScreenElement ||
	                            doc.msFullscreenElement;
                if(!fsElement){
                    goFullScreen(el);
                }else{
                    outFullScreen(el);
                }
            }

            function goFullScreen(el) {
                // debugger;

                    var tgProto = el;
                    console.log(tgProto);
                    // debugger;
                    var fnRequestFullScreen = tgProto.requestFullscreen ||
                                              tgProto.webkitRequestFullScreen ||
                                              tgProto.mozRequestFullScreen ||
                                              tgProto.msRequestFullscreen;

                    if(!!fnRequestFullScreen){
                        fnRequestFullScreen.call(tgProto);
                    }


            }
            function outFullScreen(el) {
                // body...
                var doc = $document[0];
                var fnExitFullscreen =    doc.exitFullscreen ||
                                          doc.webkitExitFullscreen ||
                                          doc.mozCancelFullScreen ||
                                          doc.msExitFullscreen;
                // debugger;
                if(!!fnExitFullscreen){
                    fnExitFullscreen.call(doc);
                }
            }

            this.keyEventHandler = function (ev) {
                console.log('key event');
                console.log(ev);
                switch (ev.keyCode) {
                    case 34:
                        goFullScreen(ev.currentTarget);
                        break;
                    case 33:
                        outFullScreen(ev.currentTarget);
                        break;
                    default:

                }
            }
        }
    }
}())
