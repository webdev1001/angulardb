var uiControllers = angular.module("uiControllers", []);

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
	$scope.items = ["item1", "item2", "item3"];
	$scope.open = function (client) {
		var modalInstance = $modal.open({
			templateUrl: "myModalContent.html",
			controller: clientDetailsModalInstanceController,
			size: "lg",
			resolve: {
				items: function () {
					return $scope.items;
				},
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

uiControllers.controller("collapseController", function ($scope) {
	$scope.isCollapsed = true;
});

uiControllers.controller("dataCopyController", function ($scope) {
	$scope.toggleInput = function (e) {
		e = e.target;
		if (e.tagName != "INPUT" && e.innerText) {
			e.innerHTML = "<input type='text' value='"+e.innerText+"'>";
			e.getElementsByTagName("input")[0].select();
		} else if (e.tagName === "INPUT") {
			e.parentNode.innerHTML = e.getAttribute("value");
		}
	}
});

var clientDetailsModalInstanceController = function ($scope, $modalInstance, client) {
	$scope.client = client;
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
