app.controller("loginCtrl", function($scope, $location, userSrv, $log, $rootScope) {

    $scope.invalidLogin = false;
    $scope.email = "booklooksys@gmail.com";
    $scope.pwd = "123";

    $scope.login = function() {

        userSrv.login($scope.email, $scope.pwd).then(function(activeUser) {
            $log.info("Successful login with: " + JSON.stringify(activeUser));

            //add logic to different paths according to user (store manager or regular user)
            // if (activeUser === "storeOwner") {
            //     $location.path("/store");    
            // } else {
            //     $location.path("/board");
            // }

            $location.path("/");

            $rootScope.activeUser = activeUser;

        }, function(err) {
            $scope.invalidLogin = true;
        });
    }

    $scope.logout = function() {
        userSrv.logout();
    }

})