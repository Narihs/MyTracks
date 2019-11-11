(function () {

    "use strict";

    var myPlaylistModule = angular.module("myPlaylistModule", []);

    myPlaylistModule.controller("PlaylistController", function ($scope, $http, $rootScope, $location, $route, $sce) {
        //get email from cookies
        $rootScope.userLog = document.cookie.split("=")[1];

        //makes relevent navigation visible
        var linkBody = document.getElementsByClassName("linkBody");
        for (var i = 0; i < linkBody.length; i++) {
            linkBody[i].style.visibility = "visible";
        }
        //makes irrelevent navigation hidden
        var linkHome = document.getElementsByClassName("linkHome");
        for (var i = 0; i < linkHome.length; i++) {
            linkHome[i].style.visibility = "hidden";
        }

        var username = document.getElementById("usernameSpan");

        getPlaylist();
        //gets playlist from db
        function getPlaylist(info) {
            $http.get("/playlist/" + $rootScope.userLog).then(function (response) {
                if (response.status == 200) {
                    $scope.playlist = response.data.playlist;
                    username.innerHTML = response.data.username;
                }
            });
        }


        //if user clicks on playlist options
        $scope.songOption = function (event) {
            //gets target class name which is song id
            var songID = event.target.className;
            saveSessionStorage(songID);

            //gets value of button clicked
            var btn = event.target.value;
            if (btn == "Edit") {
                $location.path("/editSong");
            }
            if (btn == "Play") {
                getLink();
                //sends request to server to get song link
                function getLink() {
                    $http.get("songDetails/" + $rootScope.userLog + "/" + songID).then(function (response) {
                        var link = response.data.link;
                        $scope.playLink = $sce.trustAsResourceUrl(link);
                    });
                }
            }
            if (btn == "Delete") {
                //send request to server to delete
                $http.delete("/deleteVideo/" + $rootScope.userLog + "/" + songID).then(function (response) {
                    if (response.status == 200) {
                        location.reload();
                    }
                });
            }
        }

        //funnction to save song id to sessions storage
        function saveSessionStorage(data) {
            sessionStorage.setItem("songID", data);
        }


    });

})();