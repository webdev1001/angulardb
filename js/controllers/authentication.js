/**
This file is part of angulardb, a web design and SEO marketing
database front- and back-end application.
Copyright (C) 2014  Aaron John Schlosser

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/

authControllers.controller("authenticationController", function ($state, $scope, $rootScope, api, objects, ipCookie) {
	$scope.isCollapsed = true;
	$scope.login = function () {
		$scope.message = {};
		if ($scope.u && $scope.u.name && $scope.u.pass) {
			var user = CryptoJS.SHA1($scope.u.name);
			var pass = CryptoJS.SHA1($scope.u.pass);
			api.loginUser(user,pass).then(function(data) {
				var u = data.data[0];
				console.log(data.data);
				if (u.admin_username) {
					var currentUser = new objects.User(
						u.admin_id,
						u.admin_username,
						{ first: u.admin_firstname, last: u.admin_lastname },
						u.admin_email,
						u.admin_phone,
						u.admin_title,
						u.admin_accesslevel
					);
					currentUser.authenticated = true;
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

viewControllers.controller("loginController", function ($rootScope, $scope, $location, ipCookie) {
	$scope.logout = function () {
		ipCookie.remove("user");
		$rootScope.authenticated = false;
		$location.path("login");
	}
});