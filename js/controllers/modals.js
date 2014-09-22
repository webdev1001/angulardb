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

uiControllers.controller("clientListModalsController", function ($scope, $modal, objects) {
	$scope.view = function (client) {
		var modalInstance = $modal.open({
			templateUrl: "clientDetailsModal.html",
			controller: clientDetailsModalInstanceController,
			size: "lg",
			resolve: {
				client: function () {
					var clientClone = new objects.Client();
					clientClone = JSON.parse(JSON.stringify(client));
					return clientClone;
				}
			}
		});
	};
	$scope.edit = function (client) {
		$scope.buffer = new objects.Client();
		$scope.buffer.clone(client);
		var modalInstance = $modal.open({
			templateUrl: "clientEditModal.html",
			controller: clientEditModalInstanceController,
			size: "lg",
			resolve: { client: function () { return client; } }
		}).result.catch(function (result) { $scope.$parent.client = $scope.buffer; });
	}
});

var clientDetailsModalInstanceController = function ($scope, $modalInstance, client) {
	$scope.isCollapsed = true;
	$scope.client = client;
	$scope.ok = function () { $modalInstance.close(); };
	$scope.cancel = function () { $modalInstance.dismiss("cancel"); };
};

var clientEditModalInstanceController = function ($scope, $modalInstance, api, objects, utilities, client) {
	$scope.addCollapsed = true;
	$scope.collapseEverything = function (element) { element.isCollapsed = true; }
	$scope.refresh = function (client, changed) {
		changed = changed ? changed : false;
		var i = client.sites.length;
		if (!$scope.sites) $scope.sites = [];
		while (i--) {
			if (!$scope.sites[i]) $scope.sites[i] = new objects.Site();
			var site = $scope.sites[i];
			var cSite = client.sites[i];
			site.id = cSite.id;
			site.name = cSite.name;
			site.url = cSite.url;
			site.logins = cSite.logins;
			$scope.sites[i] = site;
		}
		if (!changed) $scope.client = client;
	}
	$scope.submit = function () {
		client.last_edited_by = $scope.currentUser.name;
		client.last_edited_date = utilities.getTimestamp();
		client.sites = $scope.sites;
		$scope.status = {
			text: "Please wait while changes are submitted...",
			type: "info",
			loaded: false
		};
		api.updateClient(client).then(function (response) {
			if (response.data.indexOf("Warning") == -1 || response.data.indexOf("unsuccessful") === -1) {
				$scope.client = client;
				$scope.sites = client.sites;
				$scope.refresh(client, true);
				$scope.status = {
					text: "Done!",
					type: "success",
					loaded: true
				};
			} else {
				$scope.status = {
					text: "Oops. There was a problem: " + response.data,
					type: "danger",
					loaded: false
				}
			}
			console.log(response);
		});
	}
	$scope.ok = function () { $modalInstance.close(); };
	$scope.refresh(client);
};


