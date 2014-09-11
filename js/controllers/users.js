uiControllers.controller("userController", function ($scope, api) {
	api.getUsers().then(function(data) {
		$scope.users = data.data;
		var i = $scope.users.length;
		while (i--) {
			var u = $scope.users[i];
			var user = {
				name: u.admin_username,
				names: {
					first: u.admin_firstname,
					last: u.admin_lastname
				},
				email: u.admin_email,
				phone: u.admin_phone,
				title: u.admin_title
			};
			$scope.users[i] = user;
		}
	});
});