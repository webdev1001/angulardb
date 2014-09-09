"use strict";

var app = angular.module("searchApp", [
	"uiControllers",
	"authControllers",
	"uiDirectives",
	"ui.router",
	"ui.bootstrap",
	"ipCookie"
]);

app.factory("services", ["$http", function($http) {
	var serviceBase = "/ci2/services/";
	var obj = {};
	obj.getClients = function() {
		return $http.get(serviceBase + "getClients");
	}
	obj.updateClient = function(data) {
		return $http.post(serviceBase + "updateClient", data);
	}
	obj.getLogins = function() {
		return $http.get(serviceBase + "getLogins");
	}
	obj.loginUser = function(user,pass) {
		return $http.get(serviceBase + "loginUser?user=" + user + "&pass=" + pass);
	}
	obj.getUsers = function() {
		return $http.get(serviceBase + "getUsers");
	}
	return obj;	 
}]);

app.controller("searchCtrl", function ($rootScope, $state, $scope, $http, services) {
	if (!$rootScope.authenticated) {
		console.log("oops");
			$state.go("login");
		}
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
			$scope.results = 0;
			$scope.quantity = 10;
			$scope.increment = 10;
			$scope.clients.sort(function (a,b) {
				return a.name > b.name ? 1 : -1;
			});
			$scope.clients.toBeReversed = true;
		});
	});
});

app.controller("loginCtrl", function ($rootScope, $scope, $location, services, ipCookie) {
	$scope.logout = function () {
		ipCookie.remove("user");
		$rootScope.authenticated = false;
		$location.path("login");
	}
});

app.controller("userCtrl", function ($scope, services) {
	services.getUsers().then(function(data) {
		$scope.users = data.data;
		var i = $scope.users.length;
		while (i--) {
			var u = $scope.users[i];
			var user = {
				name: u.admin_username,
				names: {
					first: u.admin_firstname,
					last: u.admin_lastname
				},
				email: u.admin_email,
				phone: u.admin_phone,
				title: u.admin_title
			};
			$scope.users[i] = user;
		}
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
		.state('login', {
			url: "/login",
			controller: "loginCtrl",
			templateUrl: "partials/login.php"
		});
});

app.run(function ($rootScope, $location, ipCookie) {
	$rootScope.$on("$stateChangeStart", function () {
		if (!$rootScope.authenticated) {
			var u = ipCookie("user");
			if (u) {
				$rootScope.authenticated = true;
				console.log("logged in as", u.name, u.pass);
				$rootScope.currentUser = u;
			}
			else $location.path("login");
		}
	});
});