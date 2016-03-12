;(function () {
    // body...
    angular.module('g-drive', [])
        .service('GDrive', GDriveService);

    GDriveService.$inject=['$http', '$q', '$document'];
    function GDriveService($http, $q, $document) {
        this.downloadFile = function (fileId) {
            // body...
            console.log('init file download');
            var def = $q.defer();

            var request = gapi.client.drive.files.get({
                'fileId': fileId
              });
              request.execute(function(resp) {
                console.log('Title: ' + resp.title);
                // console.log('Description: ' + resp.description);
                // console.log('MIME type: ' + resp.mimeType);
                // def.resolve(resp);
                if(!!resp.downloadUrl){
                    var accessToken = gapi.auth.getToken().access_token;
                    $http({
                        method: 'GET',
                        url: resp.downloadUrl,
                        headers: {
                            'Authorization': 'Bearer ' + accessToken,
                            'Origin': document.location.origin
                        }
                    }).then(
                        function (resp) {
                            // console.log('download success:');
                            // console.log(resp);
                            def.resolve(resp);
                        },
                        function (err) {
                            console.log('download fail:');
                            console.log(err);
                            def.reject(err);
                        }
                    )
                }else{
                    def.reject({message: 'download url undefined'})
                }
            },function (err) {
                console.log('get file info error:');
                console.log(err);
                def.reject(err);
            });


            return def.promise;
        }
    }
}())
