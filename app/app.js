var app = angular.module("usedBookApp", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "app/home/homeUsedSearch.html",
            controller: "usedBookSearchCtrl"
        }).when("/board", {
            templateUrl: "app/searchBoard/searchBoard.html"
        }).when("/manage", {
            templateUrl: "manageStore.html"
        })
})