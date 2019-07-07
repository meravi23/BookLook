app.controller("searchPostCtrl", function($scope, bookSrv, userSrv, $log, $rootScope, $location) {

    $scope.bookPosts = [];

    $scope.title = "";
    $scope.author = "";
    $scope.postingPerson = "";
    $scope.img = {};
    $scope.bookPostsAlreadyCalled = false;
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

    bookSrv.getBookPosts().then(function(books) {
            if (!$scope.bookPostsAlreadyCalled) {
                $scope.bookPosts = books;
                $scope.bookPostsAlreadyCalled = true;
                console.log($scope.bookPosts);
            } else {
                return;
            }
        },
        function(err) {
            $log.error(err);
        }
    )


    $rootScope.routeNotLoggedIn = function() {

        console.log("$rootScope.isLoggedIn: " + $rootScope.isLoggedIn());
        if (!$rootScope.isLoggedIn()) {
            $location.path("/login");
        } else {
            // ??? how to route to modal window?
            $location.path("/searchPost");
        }
    }

    $scope.addNewBookPost = function() {
        // getBookPosts should be called only once! 
        // avoid calling it twice using a boolean
        bookSrv.addNewBookPost($scope.title, $scope.author, $rootScope.activeUser.fname).then(function(newBookPost) {

            $log.info("new post added: " + JSON.stringify(newBookPost));
            console.log("posted by: " + $rootScope.activeUser.fname);
            console.log("number of posts: " + $scope.bookPosts.length);
            $("#modelBookPost").modal('hide');

        });
    }


    $scope.bookPostingModal = function(post) {
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