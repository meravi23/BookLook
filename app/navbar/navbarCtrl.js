app.controller("navbarCtrl", function($scope, userSrv, $location) {

    $scope.isLoggedIn = function() {
        return userSrv.isLoggedIn();
    }

    $scope.logout = function() {
        userSrv.logout();
        $location.path("/");
    }

})