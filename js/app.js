"use strict";

var app = angular.module("searchApp", [
	"uiControllers",
	"ui.router",
	"ui.bootstrap"
]);

app.factory("services", ["$http", function($http) {
	var serviceBase = "/ci2/services/";
	var obj = {};
	obj.getClients = function() {
		return $http.get(serviceBase + "getClients");
	}
	obj.getLogins = function() {
		return $http.get(serviceBase + "getLogins");
	}
	obj.login = function() {
		return $http.get(serviceBase + "login");
	}
	return obj;	 
}]);

app.controller("searchCtrl", function ($scope, $http, services) {
	services.getClients().then(function(clients) {
		services.getLogins().then(function(logins) {
			$scope.logins = logins.data;
			for (var i in $scope.logins) {
				var l = $scope.logins[i];
				if (l.l_login_types) {
					l.l_login_types = l.l_login_types.split(",");
					l.l_login_connections = l.l_login_connections.split(",");
					l.l_login_usernames = l.l_login_usernames.split(",");
					l.l_login_passwords = l.l_login_passwords.split(",");
				}
			}
			$scope.clients = clients.data;
			for (var i in $scope.clients) {
				var c = $scope.clients[i];
				var client = {
					id: c.client_id,
					name: c.client_name,
					description: c.client_description,
					date: {
						created: c.creation_date,
						edited: c.last_edited_date
					},
					author: {
						first: c.created_by,
						last: c.last_edited_by
					},
					sites: [],
					messages: []
				};
				if (c.w_client_id) {
					c.w_website_names = c.w_website_names.split(",");
					c.w_website_urls = c.w_website_urls.split(",");
					c.w_website_ids = c.w_website_ids.split(",");
					if (c.w_website_ids.length > 0) {
						for (var j in c.w_website_ids) {
							for (var k in $scope.logins) {
								var l = $scope.logins[k];
								if (l.website_id === c.w_website_ids[j] && l.l_login_types) {
									var site = {
										id: l.website_id,
										name: c.w_website_names[j],
										url: c.w_website_urls[j],
										logins: {
											types: l.l_login_types,
											connections: l.l_login_connections,
											usernames: l.l_login_usernames,
											passwords: l.l_login_passwords
										}
									};
									client.sites.push(site);
								}
							}
						}
					}
				}
				$scope.clients[i] = client;
			}
			$scope.quantity = 10;
		});
	});
});

app.controller("loginCtrl", function ($scope, services) {
	services.login().then(function(data) {
		$scope.users = data.data;
	});
});

app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/");
	$stateProvider
		.state('search', {
			url: "/",
			controller: "searchCtrl",
			templateUrl: "partials/search.php"
		})
});

app.run(["$location", "$rootScope", function($location, $rootScope) {
	$rootScope.$on("$routeChangeSuccess", function (event, current, previous) {
		$rootScope.title = current.$$route.title;
	});
}]);