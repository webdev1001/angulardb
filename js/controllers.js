var authControllers = angular.module("authControllers", []);

var uiControllers = angular.module("uiControllers", []);

uiControllers.controller("searchResultsController", function ($scope, $filter) {
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
//client in clients | filter:q:strict | limitTo:quantity
authControllers.controller("authenticationController", function ($state, $scope, $rootScope, md5, ipCookie) {
	$scope.login = function () {
		if ($scope.u) {
			var users = $scope.$parent.users;
			var i = users.length;
			while (i--) {
				var user = users[i];
				if ($scope.u.name === user.name &&
					md5.createHash($scope.u.pass || '') === user.pass) {
					var currentUser = {
						name: user.name,
						pass: user.pass,
						authenticated: true
					};
					$rootScope.authenticated = true;
					$rootScope.currentUser = currentUser;
					ipCookie("user", currentUser);
					$state.go("search");
				}
			}
			$scope.message.text = "u wot m8";
			$scope.message.type = "alert-danger";
		}
	};
});