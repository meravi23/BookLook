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
        if (!$rootScope.isLoggedIn) {
            $location.path("/app/login/login.html");
        } else {
            $location.path("/app/searchBoard/newSearchBookPost.html");
        }
    }

    $scope.addNewBookPost = function () {
        bookSrv.addNewBookPost($scope.title, $scope.author, $scope.img).then(function(newPost){
            $log.info("new post added: " + JSON.stringify(newPost));
        });

        $scope.bookPosts.push(newPost);
    }


});