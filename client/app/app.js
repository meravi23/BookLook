var app = angular.module("usedBookApp", ["ngRoute", "ngAnimate", "ngTouch", "ui.bootstrap", "ngImageInputWithPreview", "chart.js", "720kb.socialshare"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "app/home/home.html",
            controller: "usedBookSearchCtrl"
        }).when("/board", {
            templateUrl: "app/searchBoard/searchBoard.html",
            controller: "searchPostCtrl"
        }).when("/login", {
            templateUrl: "app/login/login.html",
            controller: "loginCtrl"
        }).when("/store", {
            templateUrl: "app/store/manageStore.html",
            controller: "storeCtrl"
        }).when("/signup", {
            templateUrl: "app/signup/signupUserOrSeller.html",
        }).when("/signupShop", {
            templateUrl: "app/signup/signupShop.html",
            controller: "signupCtrl"
        }).when("/signupUser", {
            templateUrl: "app/signup/signupUser.html",
            controller: "signupCtrl"
        }).when("/searchPost", {
            templateUrl: "app/searchBoard/bookPost.html"
            // controller: "searchPostCtrl"
        }).when("/books/:id", {
            templateUrl: "app/home/book4SalePage.html",
            controller: "book4SalePageCtrl"
        }).when("/Google Book/:id", {
            templateUrl: "app/home/googleBookPage.html",
            controller: "googleBookPageCtrl"
        })
})