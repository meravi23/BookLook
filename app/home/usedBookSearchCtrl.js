app.controller("usedBookSearchCtrl", function ($scope, bookSrv, $log, $rootScope, userSrv) {

    $scope.books = [];
    $scope.searchResults = [];
    $scope.sellers = [];
    $scope.bookPosts = [];
    $rootScope.categories = [];
    $scope.userSearchInput = "";
    $scope.noResults = false;
    $scope.bookPostsAlreadyRetrievedOnce = false;
    $scope.shopsForSearch = [];


    bookSrv.getBooks4Sale().then(function (books) {
        $scope.books = books;
        // console.log($scope.books);
    }, function (err) {
        $log.error(err);
    })


    $scope.searchBook = function () {
        $scope.searchResults = [];

        for (var i = 0; i < $scope.books.length; i++) {
            if ($scope.fieldToSearch === "title" && $scope.books[i].title.includes($scope.userSearchInput) ||
                ($scope.fieldToSearch === "author" && $scope.books[i].author.includes($scope.userSearchInput)) ||
                ($scope.fieldToSearch === "isbn" && $scope.books[i].isbn.includes($scope.userSearchInput)) ||
                ($scope.fieldToSearch === "publisher" && $scope.books[i].publisher.includes($scope.userSearchInput))) {
                $scope.searchResults.push($scope.books[i]);
            } else if ($scope.fieldToSearch === "") {
                if ($scope.books[i].title.includes($scope.userSearchInput) ||
                    ($scope.books[i].author.includes($scope.userSearchInput)) ||
                    ($scope.books[i].isbn.includes($scope.userSearchInput)) ||
                    ($scope.books[i].publisher.includes($scope.userSearchInput))) {
                    $scope.searchResults.push($scope.books[i]);
                }
                // console.log("found " + $scope.searchResults.length + " book(s)");

            }
            if ($scope.searchResults.length === 0) {
                $scope.noResults = true;
            }
        }
    }

    $scope.searchByCategory = function (category) {
        $scope.searchResults = [];
        console.log(category);

        for (var i = 0; i < $scope.books.length; i++) {
            if ($scope.books[i].category === category.categoryName) {
                $scope.searchResults.push($scope.books[i]);
            } else if ($scope.searchResults.length === 0) {
                $scope.noResults = true;
            }
        }
        console.log("תוצאות חיפוש לפי קטגוריה " + $scope.searchResults.length);
    }

    $scope.searchBySubcategory = function (subcategory, event) {
        $scope.searchResults = [];
        console.log(subcategory);

        for (var i = 0; i < $scope.books.length; i++) {
            if ($scope.books[i].subCategory === subcategory) {
                $scope.searchResults.push($scope.books[i]);
            } else if ($scope.searchResults.length === 0) {
                $scope.noResults = true;
            }
        }

        console.log("תוצאות חיפוש לפי תת קטגוריה " + $scope.searchResults.length);
        event.stopPropagation();
    }

    $scope.filterByShop = function (shop) {
        for (var i = 0; i < $scope.shopsForSearch.length; i++) {
            if ($scope.shopsForSearch.includes(book[i].seller)) {
                return true;
            }
        }
    }

    $scope.searchByShop = function (shop) {


        $scope.searchResults = [];
        // var shopsToSearch = [];
        // shopsToSearch.push(shop.name);
        // console.log(shopsToSearch);

        for (var i = 0; i < $scope.books.length; i++) {
            if ($scope.books[i].seller === shop.name) {
                $scope.searchResults.push($scope.books[i]);
            } else if ($scope.searchResults.length === 0) {
                $scope.noResults = true;
            }
        }
        console.log("תוצאות חיפוש לפי חנות " + $scope.searchResults.length);
    }


    $scope.clearFields = function () {
        $scope.fieldToSearch = "";
        $scope.userSearchInput = "";
        $scope.searchResults = [];
        $scope.noResults = false;
    }


    $rootScope.getBookPosts = function () {
        if (!$scope.bookPostsAlreadyRetrievedOnce) {
            $scope.bookPosts();
        } else {
            return;
        }
    }


    $scope.bookPosts = bookSrv.getBookPosts().then(function (books) {
        $scope.bookPosts = books;
        bookPostsAlreadyRetrievedOnce = true;
    }, function (err) {
        $log.error(err);
    })


    bookSrv.getBookCategories().then(function (bookcategories) {
        for (var i = 0; i < bookcategories.length; i++) {
            $scope.categories.push(bookcategories[i]);
        }
        // console.log($scope.categories);
    }, function (err) {
        $log.error(err);
    })


    bookSrv.getSellers().then(function (sellers) {
        $scope.sellers = sellers;
        // console.log($scope.sellers);
    }, function (err) {
        $log.error(err);
    })


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
        console.log("book title: " + book.title);
        var service_id = "default_service";
        var template_id = "BookLook User Inquiry";
        emailjs.send(service_id, template_id, template_params);
        $log.info("message sent to seller!");
        alert("email sent to seller!");
    }

    $scope.contactSeeker = function (post) {
        var activeUser = userSrv.getActiveUser();
        var template_params = {
            // params and template to be updated (copied from "contact()")
            "user_name": activeUser.fname,
            "book_title": book.title,
            "user_email": activeUser.email,
            "seller_name": book.seller,
            "user_tel": activeUser.phone
            // "message_html": "message_html_value"
        }
        console.log("book title: " + book.title);
        var service_id = "default_service";
        var template_id = "BookLook User Inquiry";
        emailjs.send(service_id, template_id, template_params);
        $log.info("message sent to seller!");
        alert("email sent to the book seeker!");
    }


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
    }

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
    }

});