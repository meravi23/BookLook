app.controller("navbarCtrl", function ($scope, userSrv, $location, $rootScope) {

    $rootScope.isLoggedIn = function () {
        return userSrv.isLoggedIn();
    }

    $scope.logout = function () {
        userSrv.logout();
        $location.path("/");
    }

})