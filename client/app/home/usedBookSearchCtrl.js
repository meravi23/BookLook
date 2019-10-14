app.controller("usedBookSearchCtrl", function ($scope, bookSrv, $log, $rootScope, userSrv, $location) {

    $rootScope.routeNotLoggedIn = function () {
        console.log("userSrv.isLoggedIn: " + userSrv.isLoggedIn());
        if (!userSrv.isLoggedIn()) {
            $location.path("/login");
        }
    };

    $scope.books = [];
    $scope.recentlyAdded = [];
    $scope.sellers = [];
    $scope.shopsToSearch = [];
    $scope.bookPosts = [];
    $scope.categories = [];
    $scope.categoriesToSearch = [];
    $scope.subCategoriesToSearch = [];
    $scope.userSearchInput = "";
    $scope.fieldToSearch = "";
    $scope.googleSearchInput = "";
    $scope.showResults = false;
    $scope.showGoogleResults = false;
    $scope.noShops = false;
    $scope.bookPostsAlreadyRetrievedOnce = false;



    $scope.searchGoogleBooks = function () {
        $rootScope.gBooks = [];
        if ($scope.googleSearchInput) {
            bookSrv.getGoogleBooks($scope.googleSearchInput).then(function (books) {
                $rootScope.gBooks = books;
                console.log($rootScope.gBooks);
            }, function (err) {
                $log.error(err);
            });
        }
    }


    // const books = 'http://localhost:8000/books';
    // fetch(books)
    //     .then((resp) => resp.json()) // transform the data into json, otherwise we won't really get the response. 
    //     .then((data) => {
    //         $scope.books = data;
    //         $scope.recentlyAdded = data;
    //         console.log($scope.recentlyAdded);

    //     })
    bookSrv.getBooks4Sale().then(function (books) {
        $scope.books = books;
        $scope.recentlyAdded = books;
        // console.log($scope.books);
    }, function (err) {
        $log.error(err);
    });


    $scope.goToBook4Sale = function (bookId) {
        $location.path("/books/" + bookId);
    };

    $scope.filterByAnyField = function (book) {
        if ($scope.userSearchInput === "") {
            return true;
        } else {
            if ($scope.fieldToSearch === "") {
                if (book.title.toLowerCase().includes($scope.userSearchInput.toLowerCase()) ||
                    book.author.toLowerCase().includes($scope.userSearchInput.toLowerCase()) ||
                    book.publisher.toLowerCase().includes($scope.userSearchInput.toLowerCase()) ||
                    book.isbn.includes($scope.userSearchInput)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                if ($scope.fieldToSearch === "title") {
                    if (book.title.toLowerCase().includes($scope.userSearchInput.toLowerCase())) {
                        return true;
                    } else {
                        return false;
                    }
                } else if ($scope.fieldToSearch === "author") {
                    if (book.author.toLowerCase().includes($scope.userSearchInput.toLowerCase())) {
                        return true;
                    } else {
                        return false;
                    }
                } else if ($scope.fieldToSearch === "publisher") {
                    if (book.publisher.toLowerCase().includes($scope.userSearchInput.toLowerCase())) {
                        return true;
                    } else {
                        return false;
                    }
                } else if ($scope.fieldToSearch === "isbn") {
                    if (book.isbn.includes($scope.userSearchInput)) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        }
    }
    

    bookSrv.getBookCategories().then(function (categories) {
        $scope.categories = categories;

        categories.forEach(category => {
            $scope.categoriesToSearch.push(category.categoryName);
        });
    }, function (err) {
        $log.error(err);
    });

    $scope.restrictCategory = function (category) {
        $scope.categoriesToSearch = [];
        $scope.subCategoriesToSearch = [];
        $scope.showResults = true;
        $scope.categoriesToSearch.push(category.categoryName);
    };

    $scope.restrictSubCategory = function (subcat, event) {
        $scope.subCategoriesToSearch = [];
        $scope.subCategoriesToSearch.push(subcat);
        event.stopPropagation();
    };

    $scope.filterByCategory = function (book) {
        if ($scope.categoriesToSearch.length === 0) {
            return true;
        } else {
            if ($scope.categoriesToSearch.indexOf(book.category) >= 0) {
                return true;
            } else {
                return false;
            }
        }
    };

    $scope.filterBySubCategory = function (book) {
        if ($scope.subCategoriesToSearch.length === 0) {
            return true;
        } else {
            if ($scope.subCategoriesToSearch.indexOf(book.subCategory) != -1) {
                return true;
            } else {
                return false;
            }
        }
    };


    bookSrv.getSellers().then(function (sellers) {
        $scope.sellers = sellers;

        sellers.forEach(shop => {
            $scope.shopsToSearch.push(shop.name);
        });

    }, function (err) {
        $log.error(err);
    });

    $scope.includeShop = function (shop) {
        if ($scope.shopsToSearch.indexOf(shop.name) != -1) {
            $scope.shopsToSearch.splice($scope.shopsToSearch.indexOf(shop.name), 1);
        } else {
            $scope.shopsToSearch.push(shop.name);
        }
        if ($scope.shopsToSearch.length === 0) {
            $scope.noShops = true;
        }
    };
    $scope.filterByShop = function (book) {
        if ($scope.shopsToSearch == []) {
            return true;
        } else if ($scope.shopsToSearch.indexOf(book.seller) >= 0) {
            return true;
        } else {
            return false;
        }
    };



    $scope.clearFields = function () {
        $scope.fieldToSearch = "";
        $scope.userSearchInput = "";
        $scope.googleSearchInput = "";
        $scope.searchResults = [];
        $scope.categoriesToSearch = [];
        $scope.subCategoriesToSearch = [];
        $rootScope.gBooks = [];
        $scope.showResults = false;
        $scope.showGoogleResults = false;
    };

    $rootScope.getBookPosts = function () {
        if (!$scope.bookPostsAlreadyRetrievedOnce) {
            $scope.bookPosts();
        } else {
            return;
        }
    };

    $scope.bookPosts = bookSrv.getBookPosts().then(function (books) {
        $scope.bookPosts = books;
        bookPostsAlreadyRetrievedOnce = true;
    }, function (err) {
        $log.error(err);
    });

    $scope.goToGoogleBook = function (bookId) {
        $location.path("/Google Book/" + bookId);
    };

    $rootScope.bookPostingModal = function (post) {
        $scope.title = post.title;
        $scope.author = post.author;
        $scope.author2 = post.author2;
        $scope.translator = post.translator;
        $scope.publisher = post.publisher;
        $scope.year = post.year;
        $scope.bookState = post.state;
        $scope.edition = post.edition;
        $scope.isbn = post.isbn;
        $scope.bookCategory = post.category;
        $scope.subCategory = post.subCategory;
        $scope.image = post.image;
        $scope.bookDetails = post.comment;
        $scope.postingPerson = post.postingPerson;
    };
});