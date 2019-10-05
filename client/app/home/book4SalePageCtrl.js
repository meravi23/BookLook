app.controller("book4SalePageCtrl", function (bookSrv, $scope, $log, $routeParams, userSrv, $location, $rootScope, $window) {

    'use strict';

    $scope.sellers = [];
    $scope.payOptions = [];
    $scope.loc = $location.absUrl();
    $scope.shareMessage = 'רציתי לשתף איתך את הספר הנ"ל שמוצע למכירה בבוקלוק: ';
    var activeUser = userSrv.getActiveUser();

    bookSrv.getBookById($routeParams.id).then(function (book) {
        $scope.book = book;
        console.log($scope.book);
    }, function (err) {
        $log.error(err);
    });

    bookSrv.getSellers().then(function (sellers) {
        $scope.sellers = sellers;
        console.log($scope.sellers);
    }, function (err) {
        $log.error(err);
    });

    $scope.getPaymentOptionsPerSeller = function (seller) {
        for (let i = 0; i < $scope.sellers.length; i++) {
            if (seller == $scope.sellers[i]) {
                $scope.payOptions.push($scope.sellers[i].paymentOptions);
            }
        }
    }

    $rootScope.goBack = function () {
        $window.history.back();
    }

    $scope.contact = function (book) {
        var template_params = {
            "user_name": activeUser.fname,
            "book_title": book.title,
            "user_email": activeUser.email,
            "seller_name": book.seller,
            "user_tel": activeUser.phone
        }
        var service_id = "default_service";
        var template_id = "BookLook User Inquiry";
        emailjs.send(service_id, template_id, template_params);
        $log.info("message sent to seller!");
        alert("email sent to seller!");
    };

    $scope.contactSeeker = function (post) {
        var service_id = "default_service";
        var template_id = "book_owner_to_seeker";
        emailjs.send(service_id, template_id, template_params);
        var template_params = {
            "user_name": activeUser.fname,
            "book_title": post.title,
            "user_email": activeUser.email,
            "seeker_name": activeUser.fname,
            "user_tel": activeUser.phone
        }
        var service_id = "default_service";
        var template_id = "BookLook User Inquiry";
        emailjs.send(service_id, template_id, template_params);
        $log.info("message sent to book seeker!");
        alert("email sent to book seeker!");
    };
});