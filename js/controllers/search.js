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

uiControllers.controller("searchController", function ($scope, $filter) {
	$scope.isCollapsed = true;
	$scope.results = 0;
	$scope.update = function () {
		$scope.results++;
		if ($scope.results === $scope.quantity) $scope.results = 0;
	};
	$scope.showMore = function (n) {
		$scope.quantity += n;
		$scope.results = 0;
	};
	$scope.sort = function (by) {
		var x = $scope.clients.toBeReversed;
		$scope.clients.sort(function (a,b) {
			if (by === "name") {
				if (x) {
					$scope.clients.toBeReversed = false;
					return a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1;
				} else {
					$scope.clients.toBeReversed = true;
					return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
				}
			}
			else if (by === "id") {
				if (x) {
					$scope.clients.toBeReversed = false;
					return a.id - b.id;
				} else {
					$scope.clients.toBeReversed = true;
					return b.id - a.id;
				}
			}
			else if (by === "sites") {
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
			api.getRevisions().then(function(revisions) {
				$scope.revisions = revisions.data;
				$scope.revisions.reverse();
				for (var i in $scope.revisions) {
					var r = $scope.revisions[i];
					r.data = JSON.parse(r.data_json);
				}
				$scope.logins = logins.data;
				for (var i in $scope.logins) {
					var l = $scope.logins[i];
					l = utilities.explode(l,",");
				}
				$scope.clients = clients.data;
				for (var i in $scope.clients) {
					var c = $scope.clients[i];
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
				$scope.clients.toBeReversed = true;
			});
		});
	});
});