app.controller("usedBookSearchCtrl", function($scope, bookSrv) {

    $scope.addedBooks = [];

    bookSrv.getBooks().then(function(books) {
        $scope.addedBooks = books;
    }, function(err) {
        $log.error(err);
    })

});