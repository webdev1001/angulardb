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

apiServices.factory("api", ["$http", function($http) {
	var path = "/ci2/api/";
	var obj = {};
	obj.getClients = function() {
		return $http.get(path + "getClients");
	};
	obj.updateClient = function(data) {
		return $http.post(path + "updateClient", data);
	};
	obj.getLogins = function() {
		return $http.get(path + "getLogins");
	};
	obj.loginUser = function(user,pass) {
		return $http.get(path + "loginUser?user=" + user + "&pass=" + pass);
	};
	obj.getUsers = function() {
		return $http.get(path + "getUsers");
	};
	return obj;	 
}]);