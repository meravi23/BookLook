app.controller("searchPostCtrl", function($scope, bookSrv) {

    $scope.searchedBooks = [];

    bookSrv.getBooks().then(function(books) {
        $scope.searchedBooks = books;
        console.log($scope.searchedBooks);
    }, function(err) {
        $log.error(err);
    })
});