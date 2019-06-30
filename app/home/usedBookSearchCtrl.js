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

    $scope.searchBook = function() {
        var results = [];
        if ($scope.userSearchInput) {
            $http.get("app/model/data/booksForSale.json").then(function(response) {
                results = response.data;
                let field = $scope.fieldToSearch;
                let str = "for (item in results." + field + ") {if ($scope.userSearchInput === item) {$scope.searchResults.push(item);}}"
                eval(str);
                console.log(JSON.stringify($scope.searchResults));
            }, function(err) {
                console.error(err);
            })
        } else {
            $scope.searchResults = [];
        }
    }
});