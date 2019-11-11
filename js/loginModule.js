(function () {

    "use strict";

    var loginModule = angular.module("loginModule", []);

    loginModule.controller("LoginController", function ($scope, $http, $location, $rootScope) {

        //once login click runs function and makes obj with login info
        $scope.checkLogIn = function () {
                if ($scope.loginEmail == undefined || $scope.loginPassword == undefined) {
                    $scope.loginMessage = "Please enter email and password"
                } else {

                    // sends a get request to server to check if login info exists and is correct
                    $http.get("/login/" + $scope.loginEmail + "/" + $scope.loginPassword).then(function (data) {
                        if (data.status == 200) {
                            saveToCookies($scope.loginEmail);
                            $rootScope.userLog = document.cookie.split("=")[1];
                            $location.path("/myPlaylist");

                        } else {
                            $scope.loginMessage = "Incorrect email or password";
                        }
                    });

                }
            }
            //save email to cookies
        function saveToCookies(data) {
            var d = new Date();
            d.setMonth(d.getMonth() + 1);
            document.cookie = "Email=" + data + ";expires=" + d.toUTCString();
        }

    });

})();