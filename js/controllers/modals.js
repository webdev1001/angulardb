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

var clientDetailsModalInstanceController = function ($scope, $modalInstance, services, client) {
	$scope.isCollapsed = true;
	$scope.client = client;
	$scope.update = function () {
		var data = {
			client_id: $scope.client.id,
			client_name: $scope.client.name,
			client_description: $scope.client.description,
			last_edited_by: $scope.currentUser.name,
			last_edited_date: getTimestamp()
		};
		//services.updateClient(data).then(function (data) {
		//	console.log("echoed data:", data);
		//});
	}
	$scope.ok = function () { $modalInstance.close(); };
	$scope.cancel = function () { $modalInstance.dismiss("cancel"); };
};

var clientEditModalInstanceController = function ($scope, $modalInstance, services, client, listIndex, listScope) {
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
	function getTimestamp () {
		var currentDate = new Date();
		return currentDate.getFullYear() + "-" + (currentDate.getMonth()+1) + "-" + currentDate.getDate() + " " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
	}
	$scope.submit = function () {
		var data = {
			client_id: $scope.clientID,
			client_name: $scope.clientName,
			client_description: $scope.clientDescription,
			last_edited_by: $scope.currentUser.name,
			last_edited_date: getTimestamp()
		};
		data.sites = $scope.sites;
		console.log("Sent data:", data);
		services.updateClient(data).then(function (response) {
			console.log("Echoed data:", response);
			if (response.config.data.client_id === data.client_id) {
				listScope.clients[listIndex].name = data.client_name;
				listScope.clients[listIndex].id = data.client_id;
				listScope.clients[listIndex].description = data.client_description;
				listScope.clients[listIndex].sites = data.sites;
			}
		});
	}
	/*
	$scope.update = function () {
		var data = {
			client_id: $scope.client.id,
			client_name: $scope.client.name,
			client_description: $scope.client.description,
			last_edited_by: $scope.currentUser.name,
			last_edited_date: getTimestamp()
		};
		console.log(data);
		console.log($scope);
		//services.updateClient(data).then(function (data) {
		//	console.log("echoed data:", data);
		//});
	}
	$scope.submit = function (form) {
		console.log($scope.clientEditForm.clientID);
	}*/
	$scope.ok = function () { $modalInstance.close(); };
	$scope.cancel = function () { $modalInstance.dismiss("cancel"); };
};