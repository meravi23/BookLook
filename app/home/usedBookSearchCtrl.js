app.controller("usedBooksSearchCtrl", function($scope) {

    $scope.addedBooks = [];

    $scope.addBook = function() {
        var book = new Book("Subaru", "B4", 234000, 2015);
        $scope.addedBooks.push(book);
    }


});