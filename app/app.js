var app = angular.module("usedBookApp", ["ngRoute", "ngImageInputWithPreview"]);

app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "app/home/homeUsedSearch.html"
        })
})