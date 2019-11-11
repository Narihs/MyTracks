(function () {

    "use strict";

    var appModule = angular.module("appModule", ["ngRoute", "homeModule", "registerModule", "loginModule", "myPlaylistModule", "addSongModule", "editSongModule", "logoutModule"]);

    appModule.run(["$rootScope", function ($rootScope) {
        //Getting information from cookie
        $rootScope.userLog = document.cookie.split("=")[1];

    }]);


    appModule.config(function ($routeProvider) {

        $routeProvider.when("/home", {
            resolve: {
                //checking cookie info in order to route accordingly.
                "check": function ($rootScope, $location) {
                    if ($rootScope.userLog != undefined) {
                        $location.path("/myPlaylist");
                    }
                }
            },
            controller: "HomeController",
            templateUrl: "html/home.html",
        });
        $routeProvider.when("/register", {
            controller: "RegisterController",
            templateUrl: "html/register.html"
        });
        $routeProvider.when("/login", {
            controller: "LoginController",
            templateUrl: "html/login.html"
        });
        $routeProvider.when("/myPlaylist", {
            controller: "PlaylistController",
            templateUrl: "html/myPlaylist.html",
        });
        $routeProvider.when("/addSong", {
            controller: "AddController",
            templateUrl: "html/addSong.html"
        });
        $routeProvider.when("/editSong", {
            controller: "EditController",
            templateUrl: "html/editSong.html"
        });
        $routeProvider.when("/logout", {
            controller: "LogoutController",
            templateUrl: "html/logout.html"
        });
        $routeProvider.otherwise({
            redirectTo: "/home"
        });

    });


})();