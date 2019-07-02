app.controller("searchPostCtrl", function($scope, bookSrv, $log) {

    $scope.bookPosts = [];

    bookSrv.getBookPosts().then(function(books) {
        $scope.bookPosts = books;
        console.log($scope.bookPosts);
    }, function(err) {
        $log.error(err);
    })

});