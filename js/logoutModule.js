(function () {

    var logoutModule = angular.module("logoutModule", []);

    logoutModule.controller("LogoutController", function ($location, $scope, $rootScope) {


        $scope.logout = function () {
            //get value of button clicked
            var target = event.target.value;
            var btn = target.toLowerCase();
            if (btn == "yes") {
                //if yes removes data from cookies, session storage and rootscope
                document.cookie = "Email=;expires=Thu, 01 Jan 1970 00:00:01 GMT;"
                sessionStorage.clear()
                $rootScope.userLog = undefined;
                //returns irrelevent buttons to hidden
                var linkBody = document.getElementsByClassName("linkBody");
                for (var i = 0; i < linkBody.length; i++) {
                    linkBody[i].style.visibility = "hidden";
                }
                //returns relevent buttons to visible
                var linkHome = document.getElementsByClassName("linkHome");
                for (var i = 0; i < linkHome.length; i++) {
                    linkHome[i].style.visibility = "visible";
                }
                $location.path("/");
            } else {
                $location.path("/myPlaylist");
            }
        }
    });



})();