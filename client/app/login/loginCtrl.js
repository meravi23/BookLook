app.controller("loginCtrl", function ($scope, $location, userSrv, $log, $rootScope) {

    $rootScope.invalidLogin = false;
    $rootScope.email = "booklooksys@gmail.com";
    $rootScope.pwd = "123";

    $scope.login = function () {
        userSrv.login($scope.email, $scope.pwd).then(function (activeUser) {
            $log.info("Successful login with: " + JSON.stringify(activeUser));
            $location.path("/board");
            $rootScope.activeUser = activeUser;
        }, function (err) {
            $scope.invalidLogin = true;
        });
    }

    $scope.logout = function () {
        userSrv.logout();
    }

})