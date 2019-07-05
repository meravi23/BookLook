app.controller("searchPostCtrl", function($scope, bookSrv, $log, $rootScope, $location) {

    $scope.bookPosts = [];

    bookSrv.getBookPosts().then(function(books) {
        $scope.bookPosts = books;
        console.log($scope.bookPosts);
    }, function(err) {
        $log.error(err);
    })

    $scope.routeNotLoggedIn = function () {
        if (!$rootScope.isLoggedIn) {
            $location.path("/app/login/login.html");
        } else {
            $location.path("newSearchBookPost.html");
        }
    }


});