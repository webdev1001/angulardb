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

uiControllers.controller("userController", function ($scope, api, objects) {
	api.getUsers().then(function(data) {
		$scope.users = data.data;
		var i = $scope.users.length;
		while (i--) {
			var u = $scope.users[i];
			var user = new objects.User(
				u.admin_id,
				u.admin_username,
				{ first: u.admin_firstname, last: u.admin_lastname },
				u.admin_email,
				u.admin_phone,
				u.admin_title,
				u.admin_accesslevel
			);
			$scope.users[i] = user;
		}
	});
});