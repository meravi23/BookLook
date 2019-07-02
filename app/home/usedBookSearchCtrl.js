app.controller("usedBookSearchCtrl", function($scope, bookSrv, $log) {

    $scope.books = [];
    $scope.searchResults = [];
    $scope.userSearchInput = "";


    bookSrv.getBooks4Sale().then(function(books) {
        $scope.books = books;
        console.log($scope.books);
    }, function(err) {
        $log.error(err);
    })


    $scope.searchBook = function() {

        $scope.searchResults = [];

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

    $scope.searchByCategory = function() {
        $scope.searchResults = [];
        for (var i = 0; i < $scope.books.length; i++) {
            
      }

});