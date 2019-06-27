var app = angular.module("usedBookApp", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "app/home/homeUsedSearch.html"
        })
})