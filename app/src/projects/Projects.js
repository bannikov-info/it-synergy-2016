;(function () {
    angular.module('projects', ['ngFileUpload', 'lk-google-picker', 'g-drive'])
    .config(['lkGoogleSettingsProvider', function (lkGoogleSettingsProvider) {
        lkGoogleSettingsProvider.configure({
            apiKey   : 'AIzaSyAn2YVsmFhmlqH5qVKwSEYgBJfjrmosv_s',
            clientId : '790567548549-a3l1ukhc46kgjm5dib2meb8jvp688p9s.apps.googleusercontent.com'
        });
    }])


}())
