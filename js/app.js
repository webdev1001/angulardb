"use strict";

var app = angular.module("searchApp", [
	"uiControllers",
	"authControllers",
	"viewControllers",
	"apiServices",
	"uiDirectives",
	"ui.router",
	"ui.bootstrap",
	"ipCookie"
]);

app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/");
	$stateProvider
		.state('search', {
			url: "/",
			controller: "searchViewController",
			templateUrl: "partials/search.php"
		})
		.state('login', {
			url: "/login",
			controller: "loginController",
			templateUrl: "partials/login.php"
		});
});

app.run(function ($rootScope, $location, services, ipCookie) {
	$rootScope.$on("$stateChangeStart", function () {
		if (!$rootScope.authenticated) {
			var u = ipCookie("user");
			if (u) {
				$rootScope.authenticated = true;
				$rootScope.currentUser = u;
			}
			else $location.path("login");
		}
	});
});