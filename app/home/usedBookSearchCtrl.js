app.controller("usedBookSearchCtrl", function($scope, bookSrv, $http) {

    $scope.addedBooks = [];
    $scope.searchResults = [];
    $scope.userSearchInput = "";

    bookSrv.getBooks4Sale().then(function(books) {
        $scope.addedBooks = books;
        console.log($scope.addedBooks);
    }, function(err) {
        $log.error(err);
    })

    $scope.updateSearchResults = function() {
        if ($scope.userSearchInput) {

            $http.get("app/model/data/booksForSale.json").then(function(res) {
                console.log(JSON.stringify(res.data));
                $scope.searchResults = res.data.results;
            }, function(err) {
                console.error(err);
            })
        } else {
            $scope.searchResults = [];
        }
    }
});