app.controller("searchPostCtrl", function ($scope, bookSrv, $log, $rootScope, $location) {

    $scope.bookPosts = [];
    
    $scope.title = "";
    $scope.author = "";
    $scope.img = {};
    // $scope.author2 = "";
    // $scope.translator = "";
    // $scope.publisher = "";
    // $scope.year = "";
    // $scope.bookState = "";
    // $scope.edition = "";
    // $scope.isbn = "";
    // $scope.bookCategory = ""
    // $scope.subCategory = "";
    // $scope.bookDetails = "";

    bookSrv.getBookPosts().then(function (books) {
        $scope.bookPosts = books;
        console.log($scope.bookPosts);
    }, function (err) {
        $log.error(err);
    })

    $scope.routeNotLoggedIn = function () {

        console.log("$rootScope.isLoggedIn: " + $rootScope.isLoggedIn());
        if (!$rootScope.isLoggedIn()) {
            $location.path("/login");
        } else {
            $location.path("/searchPost");
        }
    }

    $scope.addNewBookPost = function () {
        bookSrv.addNewBookPost($scope.title, $scope.author, $scope.img).then(function(newPost){
            $log.info("new post added: " + JSON.stringify(newPost));
        });

        $scope.bookPosts.push(newPost);
    }

    $scope.bookPostingModal = function (post) {
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