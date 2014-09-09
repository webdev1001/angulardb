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