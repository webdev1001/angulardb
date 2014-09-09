uiControllers.controller("searchController", function ($scope, $filter) {
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