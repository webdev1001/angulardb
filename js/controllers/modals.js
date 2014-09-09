uiControllers.controller("loginModalController", function ($scope, $modal) {
	$scope.open = function () {
		var modalInstance = $modal.open({
			templateUrl: "loginModal.html",
			controller: loginModalInstanceController,
			size: "sm"
		});
	};
});

uiControllers.controller("clientDetailsModalController", function ($scope, $modal, $log) {
	$scope.open = function (client) {
		var modalInstance = $modal.open({
			templateUrl: "myModalContent.html",
			controller: clientDetailsModalInstanceController,
			size: "lg",
			resolve: {
				client: function () {
					return client;
				}
			}
		});
		modalInstance.result.then(function (selectedItem) {
			$scope.selected = selectedItem;
		}, function () {
			$log.info("Modal dismissed at: " + new Date());
		});
	};
});

var clientDetailsModalInstanceController = function ($scope, $modalInstance, services, client) {
	function getTimestamp () {
		var currentDate = new Date();
		return currentDate.getFullYear() + "-" + (currentDate.getMonth()+1) + "-" + currentDate.getDate() + " " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
	}
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
		services.updateClient(data).then(function (data) {
			console.log("echoed data:", data);
		})
	}
	$scope.ok = function () { $modalInstance.close(); };
	$scope.cancel = function () { $modalInstance.dismiss("cancel"); };
};

var loginModalInstanceController = function ($scope, $modalInstance) {
	$scope.ok = function () { $modalInstance.close(); };
	$scope.cancel = function () { $modalInstance.dismiss("cancel"); };
	$scope.login = function (credentials) {
		console.log($scope);
	}
};