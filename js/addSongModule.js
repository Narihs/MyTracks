(function () {

    "use strict";

    var addSongModule = angular.module("addSongModule", []);

    addSongModule.controller("AddController", function ($scope, $http, $location, $rootScope) {


        $scope.addSong = function () {
            //validateing Song
            if ($scope.addSongTitle == undefined) {
                $scope.titleMessage = "Please enter song title";
                return;
            } else if ($scope.addSongCategory == undefined) {
                $scope.categoryMessage = "Please enter song category";
                return;
            } else if (checkSongLink()) {
                $scope.linkMessage = "Please enter vaild YouTube link";
                return;
            } else {
                var link = "https://www.youtube.com/embed/" + $scope.addSongLink.split("=")[1];
                //If validation is good, obj with info is made
                $rootScope.userLog = document.cookie.split("=")[1];
                var videoInfo = {
                        email: $rootScope.userLog,
                        title: $scope.addSongTitle,
                        category: $scope.addSongCategory,
                        description: $scope.addSongDes,
                        link: link
                    }
                    //sends a post to the server with video info 
                $http.post("/addSong", videoInfo).then(function (data) {
                    //if everything ok
                    if (data.status == 201) {
                        $location.path("/myPlaylist"); //redirects to playlist page
                    } else {
                        return;
                    }
                });
            }
        }

        //link validation
        function checkSongLink() {
            var regex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;

            if ($scope.addSongLink == "") {
                return true;
            } else if (regex.test($scope.addSongLink)) {
                return false;
            } else {
                return true;
            }
        }

    });
})();