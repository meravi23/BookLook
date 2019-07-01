app.controller("usedBookSearchCtrl", function($scope, bookSrv, $log) {

    $scope.books = [];
    $scope.searchResults = [];
    $scope.userSearchInput = "";
    $scope.filterObj = {};


    bookSrv.getBooks4Sale().then(function(books) {
        $scope.books = books;
        console.log($scope.books);
    }, function(err) {
        $log.error(err);
    })


    $scope.searchBook = function() {

        $scope.searchResults = [];

        // console.log("books in array: " + JSON.stringify($scope.books));
        for (var i = 0; i < $scope.books.length; i++) {
            if ($scope.fieldToSearch === "title" && $scope.books[i].title.includes($scope.userSearchInput) ||
                ($scope.fieldToSearch === "author" && $scope.books[i].author.includes($scope.userSearchInput)) ||
                ($scope.fieldToSearch === "isbn" && $scope.books[i].isbn.includes($scope.userSearchInput)) ||
                ($scope.fieldToSearch === "publisher" && $scope.books[i].publisher.includes($scope.userSearchInput))) {
                $scope.searchResults.push($scope.books[i]);
            } else {
                // $scope.searchResults = [];
                // $log.info("no results");
                console.log("found " + $scope.searchResults.length + " book(s)");
            }
        }
    }

});