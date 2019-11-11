(function () {

    "use strict";

    var editSongModule = angular.module("editSongModule", []);

    editSongModule.controller("EditController", function ($scope, $rootScope, $http, $location) {
        //get songId from session storage
        var songID = sessionStorage.getItem("songID");
        getSongDetails();
        //gets song details and show on edit page
        function getSongDetails() {
            var obj = {
                email: $rootScope.userLog,
                _id: songID
            }
            $http.get("/songDetails/" + $rootScope.userLog + "/" + songID).then(function (response) {
                $scope.songTitle = response.data.title;
                $scope.songCategory = response.data.category;
                $scope.songDes = response.data.description;
                $scope.songLink = response.data.link;
            });
        }
        //runs to save song
        $scope.saveEdit = function () {
            if (validateSong()) {
                //if validation good then sends request to server to change data
                $http({
                    method: "PUT",
                    url: "/updateSong/" + $rootScope.userLog + "/" + songID,
                    data: {
                        title: $scope.songTitle,
                        category: $scope.songCategory,
                        description: $scope.songDes,
                        link: $scope.songLink
                    }
                }).then(function (response) {
                    $location.path("/myPlaylist");
                });
            }
        }

        //song validation
        function validateSong() {
            //validateing Song
            if ($scope.songTitle == undefined) {
                $scope.titleMessage = "Please enter song title";
                return;
            } else if ($scope.songCategory == undefined) {
                $scope.categoryMessage = "Please enter song category";
                return;
            } else if (checkSongLink()) {
                $scope.linkMessage = "Please enter vaild YouTube link";
                return;
            } else {
                return true;
            }
        }
        //link validation
        function checkSongLink() {
            var regex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;

            if ($scope.songLink == "") {
                return true;
            } else if (regex.test($scope.songLink)) {
                return false;
            } else {
                return true;
            }
        }
    });
})();