(function () {

    "use strict";

    var registerModule = angular.module("registerModule", []);

    registerModule.controller("RegisterController", function ($scope, $http, $location, $rootScope) {


        $scope.validateForm = function () {
            //validateing form
            if (validateEmail()) {
                $scope.emailMessage = "Please enter valid email";
                return;
            } else if (validateUsername()) {
                $scope.usernameMessage = "Username must be between 2 and 8 digits long and can include letters,numbers and underscore.";
                return;
            } else if (validatePassword()) {
                $scope.passwordMessage = "Password must be between 4 and 8 digits long and include at least one numeric digit. ";
                return;
            } else {
                //If validation is good, obj with use info is made
                var userInfo = {
                        email: $scope.regEmail,
                        username: $scope.regUsername,
                        password: $scope.regPassword
                    }
                    //sends a post to the server with user info and checks if email exisits
                $http.post("/register", userInfo).then(function (data) {
                    //if everything ok
                    if (data.status == 201) {
                        saveToCookies($scope.regEmail); //adds email to cookie
                        //addToLocalStorage($scope.regEmail);
                        $location.path("/myPlaylist"); //redirects to playlist page

                    } else {
                        //if email exisits shows message
                        $scope.emailMessage = "Email already exists"; // if email exisits shows error
                        $scope.emailColor = {
                            "color": "red"
                        };
                        return;
                    }
                });
            }
        }

        //All the functions used 

        //email validation
        function validateEmail() {
            var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

            if ($scope.regEmail == "") {
                return true;
            } else if (regex.test($scope.regEmail)) {
                $scope.emailMessage = "OK";
                $scope.emailColor = {
                    "color": "green"
                };
                return false;
            } else {
                return true;
            }
        }
        //username validation
        function validateUsername() {
            var regex = /^\w{2,8}$/

            if ($scope.regUsername == "") {
                return true;
            } else if (regex.test($scope.regUsername)) {
                $scope.usernameMessage = "OK";
                $scope.usernameColor = {
                    "color": "green"
                };
                return false;
            } else {
                return true;
            }
        }
        //password validation
        function validatePassword() {
            var regex = /^(?=.*\d).{4,8}$/

            if ($scope.regPassword == "") {
                return true;
            } else if (regex.test($scope.regPassword)) {
                $scope.passwordMessage = "OK";
                $scope.passwordColor = {
                    "color": "green"
                };
                return false;
            } else {
                return true;
            }
        }
        //function save email to cookies
        function saveToCookies(data) {
            var d = new Date();
            d.setMonth(d.getMonth() + 1);
            document.cookie = "Email=" + data + ";expires=" + d.toUTCString();
        }
    });
})();