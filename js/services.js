var apiServices = angular.module("apiServices", []);

apiServices.factory("services", ["$http", function($http) {
	var serviceBase = "/ci2/services/";
	var obj = {};
	obj.getClients = function() {
		return $http.get(serviceBase + "getClients");
	}
	obj.updateClient = function(data) {
		return $http.post(serviceBase + "updateClient", data);
	}
	obj.getLogins = function() {
		return $http.get(serviceBase + "getLogins");
	}
	obj.loginUser = function(user,pass) {
		return $http.get(serviceBase + "loginUser?user=" + user + "&pass=" + pass);
	}
	obj.getUsers = function() {
		return $http.get(serviceBase + "getUsers");
	}
	return obj;	 
}]);