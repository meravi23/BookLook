app.controller("googleBookPageCtrl", function ($q, $http, $scope, $log, $routeParams,
    $rootScope, $window) {

    'use strict';

    function getGoogleBook(id) {
        var async = $q.defer();
        const query = "https://www.googleapis.com/books/v1/volumes?q=" + id;
        $http.get(query).then(function (res) {
                console.log(res.data.items[0]);
                let gBook = res.data.items[0];
                async.resolve(gBook);
            },
            function (err) {
                $log.error(err);
                async.reject(err);
            });

        return async.promise;
    };

    getGoogleBook($routeParams.id).then(function (gBook) {
        $scope.googleBook = gBook;
        let gBookInfo = gBook.volumeInfo;
        $scope.id = gBook.id;
        $scope.title = gBookInfo.title;
        $scope.subtitle = gBookInfo.subtitle;
        $scope.author = gBookInfo.authors ? gBookInfo.authors[0] : "ללא מחבר";
        $scope.author2 = gBookInfo.authors && gBookInfo.authors.length > 1 ? gBookInfo.authors[1] : null;
        $scope.publisher = gBookInfo.publisher;
        $scope.year = (gBookInfo.publishedDate) ? (gBookInfo.publishedDate).slice(0, 4) : "לא ידוע";
        $scope.edition = null;
        $scope.isbn = gBookInfo.industryIdentifiers[0].identifier;
        $scope.category = gBookInfo.categories ? gBookInfo.categories[0] : null;
        $scope.description = gBookInfo.description;
        $scope.image = gBookInfo.imageLinks ? gBookInfo.imageLinks.thumbnail : null;
        $scope.price = gBook.saleInfo.saleability == "FOR_SALE" ? gBook.saleInfo.retailPrice.amount : "לא למכירה";
        $scope.language = gBookInfo.language;
    }, function (err) {
        $log.error(err);
    });


    $rootScope.goBack = function () {
        $window.history.back();
    }
});