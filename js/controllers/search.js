uiControllers.controller("searchController", function ($scope, $filter) {
	$scope.isCollapsed = true;
	$scope.results = 0;
	$scope.update = function () {
		$scope.results++;
		if ($scope.results === $scope.quantity) {
			$scope.results = 0;
		}
	};
	$scope.showMore = function (n) {
		$scope.quantity += n;
		$scope.results = 0;
	};
	$scope.sort = function (predicate) {
		var x = $scope.clients.toBeReversed;
		$scope.clients.sort(function (a,b) {
			if (predicate === "name") {
				if (x) {
					$scope.clients.toBeReversed = false;
					return a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1;
				} else {
					$scope.clients.toBeReversed = true;
					return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
				}
			}
			else if (predicate === "id") {
				if (x) {
					$scope.clients.toBeReversed = false;
					return a.id - b.id;
				} else {
					$scope.clients.toBeReversed = true;
					return b.id - a.id;
				}
			}
			else if (predicate === "sites") {
				if (x) {
					$scope.clients.toBeReversed = false;
					return a.sites.length - b.sites.length;
				} else {
					$scope.clients.toBeReversed = true;
					return b.sites.length - a.sites.length;
				}
			}
		});
	}
});

viewControllers.controller("searchViewController", function ($rootScope, $state, $scope, $http, services) {
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
					category: "client",
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
										category: "site",
										id: l.website_id,
										name: c.w_website_names[j],
										url: c.w_website_urls[j],
										logins: {
											category: "login",
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