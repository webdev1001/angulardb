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

function getTimestamp () {
	var currentDate = new Date();
	return currentDate.getFullYear() + "-" + (currentDate.getMonth()+1) + "-" + currentDate.getDate() + " " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
}

var clientDetailsModalInstanceController = function ($scope, $modalInstance, services, client) {
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

authControllers.controller("authenticationController", function ($state, $scope, $rootScope, services, ipCookie) {
	$scope.login = function () {
		$scope.message = {};
		if ($scope.u && $scope.u.name && $scope.u.pass) {
			var user = CryptoJS.SHA1($scope.u.name);
			var pass = CryptoJS.SHA1($scope.u.pass);
			services.loginUser(user,pass).then(function(data) {
				var u = data.data[0];
				if (u.admin_username) {
					var currentUser = {
						name: u.admin_username,
						pass: u.admin_password,
						email: u.admin_email,
						authenticated: true
					};
					$rootScope.currentUser = currentUser;
					$rootScope.authenticated = true;
					ipCookie("user", currentUser);
					$state.go("search");
				} else {
					$scope.message.text = "username or password no bueno";
					$scope.message.type = "alert-danger";
				}
			});
		} else {
			$scope.message.text = "forget something?";
			$scope.message.type = "alert-warning";
		}
	};
});