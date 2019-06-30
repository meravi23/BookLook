app.controller("usedBookSearchCtrl", function($scope, bookSrv) {

    $scope.addedBooks = [];

    bookSrv.getBooks4Sale().then(function(books) {
        $scope.addedBooks = books;
        console.log($scope.addedBooks);
    }, function(err) {
        $log.error(err);
    })

});