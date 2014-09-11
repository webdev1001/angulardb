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

viewControllers.controller("searchViewController", function ($rootScope, $state, $scope, $http, api, objects, utilities) {
	if (!$rootScope.authenticated) $state.go("login");
	api.getClients().then(function(clients) {
		api.getLogins().then(function(logins) {
			$scope.logins = logins.data;
			for (var i in $scope.logins) {
				var l = $scope.logins[i];
				l = utilities.explode(l,",");
			}
			$scope.clients = clients.data;
			for (var i in $scope.clients) {
				var c = $scope.clients[i];
				if (c.client_id == "3" || c.client_id == 3) console.log(c);
				var client = new objects.Client(
					c.client_id,
					c.client_name,
					c.client_description,
					{ a: c.created_by, b: c.last_edited_by },
					{ a: c.creation_date, b: c.last_edited_date }
				);
				if (c.w_client_id) {
					c = utilities.explode(c,",","w_web");
					if (c.w_website_ids.length > 0) {
						for (var j in c.w_website_ids) {
							for (var k in $scope.logins) {
								var l = $scope.logins[k];
								if (l.website_id === c.w_website_ids[j] && l.l_login_types) {
									var site = new objects.Site(
										l.website_id,
										c.w_website_names[j],
										c.w_website_urls[j],
										{
											ids: l.l_login_ids,
											types: l.l_login_types,
											connections: l.l_login_connections,
											usernames: l.l_login_usernames,
											passwords: l.l_login_passwords
										}
									);
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
			$scope.clients.sort(function (a,b) { return a.name > b.name ? 1 : -1; });
			$scope.clients.toBeReversed = true;
		});
	});
});