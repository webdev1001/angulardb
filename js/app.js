/**
This file is part of angulardb, a web design and SEO marketing
database front- and back-end application.
Copyright (C) 2014  Aaron John Schlosser

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/

"use strict";

var app = angular.module("searchApp", [
	"uiControllers",
	"authControllers",
	"viewControllers",
	"utlServices",
	"objServices",
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
app.run(function ($rootScope, $location, objects, ipCookie) {
	$rootScope.$on("$stateChangeStart", function () {
		if (!$rootScope.authenticated) {
			var cookie = ipCookie("user");
			if (cookie) {
				$rootScope.authenticated = true;
				var u = new objects.User();
				u.copy(cookie);
				$rootScope.currentUser = u;
			}
			else $location.path("login");
		}
	});
});