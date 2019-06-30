var app = angular.module("usedBookApp", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "app/home/homeUsedSearch.html",
            controller: "usedBookSearchCtrl"
        }).when("/board", {
            templateUrl: "app/searchBoard/searchBoard.html",
            controller: "searchPostCtrl"
        }).when("/manage", {
            templateUrl: "manageStore.html"
        }).when("/login", {
            templateUrl: "app/login/login.html",
            controller: "loginCtrl"
        })
})