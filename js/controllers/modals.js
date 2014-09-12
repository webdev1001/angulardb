uiControllers.controller("clientListModalsController", function ($scope, $modal, $log) {
	$scope.view = function (client) {
		var modalInstance = $modal.open({
			templateUrl: "clientDetailsModal.html",
			controller: clientDetailsModalInstanceController,
			size: "lg",
			resolve: { client: function () { return client; } }
		});
	};
	$scope.edit = function (client, listIndex) {
		var modalInstance = $modal.open({
			templateUrl: "clientEditModal.html",
			controller: clientEditModalInstanceController,
			size: "lg",
			resolve: {
				client: function () { return client; },
				listIndex: function () { return listIndex; },
				listScope: function () { return $scope; }
			}
		});
	}
});

var clientDetailsModalInstanceController = function ($scope, $modalInstance, client) {
	$scope.isCollapsed = true;
	$scope.client = client;
	$scope.ok = function () { $modalInstance.close(); };
	$scope.cancel = function () { $modalInstance.dismiss("cancel"); };
};

var clientEditModalInstanceController = function ($scope, $modalInstance, api, objects, utilities, client, listIndex, listScope) {
	$scope.clientID = client.id;
	$scope.clientName = client.name;
	$scope.clientDescription = client.description;
	var i = client.sites.length;
	$scope.sites = {};
	while (i--) {
		if (!$scope.sites[i]) $scope.sites[i] = {};
		var site = $scope.sites[i];
		var cSite = client.sites[i];
		site.id = cSite.id;
		site.name = cSite.name;
		site.url = cSite.url;
		site.logins = cSite.logins;
		$scope.sites[i] = site;
	}
	$scope.client = client;
	console.log($scope.sites);
	$scope.submit = function () {
		var data = {
			client_id: $scope.clientID,
			client_name: $scope.clientName,
			client_description: $scope.clientDescription,
			last_edited_by: $scope.currentUser.name,
			last_edited_date: utilities.getTimestamp()
		};
		data.sites = $scope.sites;
		console.log("Sent data:", data);
		api.updateClient(data).then(function (response) {
			console.log("Echoed data:", response);
			if (response.config.data.client_id === data.client_id) {
				listScope.clients[listIndex].name = data.client_name;
				listScope.clients[listIndex].id = data.client_id;
				listScope.clients[listIndex].description = data.client_description;
				listScope.clients[listIndex].sites = data.sites;
			}
		});
	}
	$scope.ok = function () { $modalInstance.close(); };
	$scope.cancel = function () { $modalInstance.dismiss("cancel"); };
};