app.controller("usedBookSearchCtrl", function ($scope, bookSrv, $log, $rootScope, userSrv) {
    $rootScope.routeNotLoggedIn = function () {
        console.log("userSrv.isLoggedIn: " + userSrv.isLoggedIn());
        if (!userSrv.isLoggedIn()) {
            $location.path("/login");
        }
    };
    $scope.books = [];
    $scope.sellers = [];
    $scope.shopsToSearch = [];
    $scope.bookPosts = [];
    $scope.categories = [];
    $scope.categoriesToSearch = [];
    $scope.subCategoriesToSearch = [];
    $scope.userSearchInput = "";
    $scope.noResults = true;
    $scope.noShops = false;
    $scope.bookPostsAlreadyRetrievedOnce = false;
    $scope.fieldToSearch = "";
    $scope.shareMessage = 'רציתי לשתף איתך את הספר הנ"ל שמוצע למכירה בבוקלוק: ';
    $scope.loc = location.path;

    $scope.searchResults = [];

    bookSrv.getBooks4Sale().then(function (books) {
        $scope.books = books;
        console.log($scope.books);
    }, function (err) {
        $log.error(err);
    });

    $scope.filterByAnyField = function (book) {
        if ($scope.userSearchInput === "") {
            return true;
        } else {
            if ($scope.fieldToSearch === "") {
                if (book.title.includes($scope.userSearchInput) ||
                    book.author.includes($scope.userSearchInput) ||
                    book.publisher.includes($scope.userSearchInput) ||
                    book.isbn.includes($scope.userSearchInput)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                if ($scope.fieldToSearch === "title") {
                    if (book.title.includes($scope.userSearchInput)) {
                        return true;
                    } else {
                        return false;
                    }
                } else if ($scope.fieldToSearch === "author") {
                    if (book.author.includes($scope.userSearchInput)) {
                        return true;
                    } else {
                        return false;
                    }
                } else if ($scope.fieldToSearch === "publisher") {
                    if (book.publisher.includes($scope.userSearchInput)) {
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
        $scope.categoriesToSearch.push(category.categoryName);
    };
    
    $scope.restrictSubCategory = function (subcat, event) {
        $scope.subCategoriesToSearch = [];
        $scope.subCategoriesToSearch.push(subcat);
        console.log($scope.subCategoriesToSearch);
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
        $scope.searchResults = [];
        $scope.categoriesToSearch = [];
        $scope.subCategoriesToSearch = [];
        $scope.noResults = false;
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

    $scope.contact = function (book) {
        var activeUser = userSrv.getActiveUser();
        var template_params = {
            "user_name": activeUser.fname,
            "book_title": book.title,
            "user_email": activeUser.email,
            "seller_name": book.seller,
            "user_tel": activeUser.phone
            // "message_html": "message_html_value" 
        }
        // console.log("book title: " + book.title); 
        var service_id = "default_service";
        var template_id = "BookLook User Inquiry";
        emailjs.send(service_id, template_id, template_params);
        $log.info("message sent to seller!");
        alert("email sent to seller!");
    };


    $scope.contactSeeker = function (post) {
        var activeUser = userSrv.getActiveUser();
        var service_id = "default_service";
        var template_id = "book_owner_to_seeker";
        emailjs.send(service_id, template_id, template_params);
        var template_params = {
            // params and template to be updated (copied from "contact()") "user_name": activeUser.fname, "book_title": post.title, "user_email": activeUser.email, 
            // "seeker_name": post.fname, "user_tel": activeUser.phone // "message_html": "message_html_value" 
        }
        // console.log("book title: " + post.title); 
        var service_id = "default_service";
        var template_id = "BookLook User Inquiry";
        emailjs.send(service_id, template_id, template_params);
        $log.info("message sent to book seeker!");
        alert("email sent to book seeker!");
    };


    $scope.book4SaleModal = function (book) {
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
        $scope.seller = book.seller;
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