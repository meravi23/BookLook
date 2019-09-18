app.controller("book4SalePageCtrl", function (bookSrv, $scope, $log, $routeParams) {

    bookSrv.getBookById($routeParams.id).then(function (book) {
        $scope.book = book;
        console.log($scope.book);
    }, function (err) {
        $log.error(err);
    });

});