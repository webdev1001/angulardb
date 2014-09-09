uiControllers.controller("clientListModalsController", function ($scope, $modal, $log) {
	$scope.view = function (client) {
		var modalInstance = $modal.open({
			templateUrl: "clientDetailsModal.html",
			controller: clientDetailsModalInstanceController,
			size: "lg",
			resolve: { client: function () { return client; } }
		});
	};
	$scope.edit = function (client) {
		var modalInstance = $modal.open({
			templateUrl: "clientEditModal.html",
			controller: clientEditModalInstanceController,
			size: "lg",
			resolve: { client: function () { return client; } }
		});
	}
});

var clientDetailsModalInstanceController = function ($scope, $modalInstance, services, client) {
	function getTimestamp () {
		var currentDate = new Date();
		return currentDate.getFullYear() + "-" + (currentDate.getMonth()+1) + "-" + currentDate.getDate() + " " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
	}
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
		console.log(data);
		//services.updateClient(data).then(function (data) {
		//	console.log("echoed data:", data);
		//});
	}
	$scope.ok = function () { $modalInstance.close(); };
	$scope.cancel = function () { $modalInstance.dismiss("cancel"); };
};

var clientEditModalInstanceController = function ($scope, $modalInstance, services, client) {
	$scope.client = client;
	$scope.ok = function () { $modalInstance.close(); };
	$scope.cancel = function () { $modalInstance.dismiss("cancel"); };
};