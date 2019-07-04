app.controller("usedBookSearchCtrl", function($scope, bookSrv, $log) {

    $scope.books = [];
    $scope.searchResults = [];
    $scope.sellers = [];
    $scope.bookPosts = [];
    $scope.categories = [];
    $scope.userSearchInput = "";
    $scope.noResults = false;


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
                console.log("found " + $scope.searchResults.length + " book(s)");

            } else if ($scope.searchResults.length === 0) {
                $scope.noResults = true;
            }
        }
    }



    $scope.searchByCategory = function(category) {
        console.log(category);

        for (var i = 0; i < $scope.books.length; i++) {
            console.log($scope.books[i].category); //"2"

            if ($scope.books[i].category === category) {
                $scope.searchResults.push($scope.books[i]);
            }
        }
        console.log($scope.searchResults);
    }


    $scope.clearFields = function() {
        $scope.fieldToSearch = "";
        $scope.userSearchInput = "";
        $scope.searchResults = [];
    }


    $scope.bookPosts = bookSrv.getBookPosts().then(function(books) {
        $scope.bookPosts = books;
        console.log($scope.bookPosts);
    }, function(err) {
        $log.error(err);
    })


    bookSrv.getBookCategories().then(function(bookcategories) {
        for (var i = 0; i < bookcategories.length; i++) {
            $scope.categories.push(bookcategories[i]);
        }
        console.log($scope.categories);
    }, function(err) {
        $log.error(err);
    })


    bookSrv.getSellers().then(function(sellers) {
        $scope.sellers = sellers;
        console.log($scope.sellers);
    }, function(err) {
        $log.error(err);
    })


    // $scope.sellerName = "";

    // function getSellerName(bookId) {
    //     for (var i = 0; i < $scope.sellers.length; i++) {
    //         if (bookId === $scope.sellers[i].id) {
    //             $scope.sellerName = $scope.sellers[i].name;
    //         }
    //     }
    //     console.log($scope.sellerName);
    // }


    $scope.book4SaleModal = function(book) {
        $scope.title = book.title;
        $scope.author = book.author;
        $scope.author2 = book.author2;
        $scope.translator = book.translator;
        $scope.publisher = book.publisher;
        $scope.year = book.year;
        $scope.bookState = book.state;
        $scope.edition = book.edition;
        $scope.isbn = book.isbn;
        $scope.bookCategory = book.category;
        $scope.subCategory = book.subCategory;
        $scope.image = book.image;
        $scope.bookDetails = book.comment;
        $scope.price = book.price;
        $scope.seller = getSellerName(book.sellerId);
    }

    $scope.bookPostingModal = function(book) {
        $scope.title = book.title;
        $scope.author = book.author;
        $scope.author2 = book.author2;
        $scope.translator = book.translator;
        $scope.publisher = book.publisher;
        $scope.year = book.year;
        $scope.bookState = book.state;
        $scope.edition = book.edition;
        $scope.isbn = book.isbn;
        $scope.bookCategory = book.category;
        $scope.subCategory = book.subCategory;
        $scope.image = book.image;
        $scope.bookDetails = book.comment;
        $scope.postingPerson = book.postingPerson;
    }

});