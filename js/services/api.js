apiServices.factory("api", ["$http", function($http) {
	var path = "/ci2/api/";
	var obj = {};
	obj.getClients = function() {
		return $http.get(path + "getClients");
	}
	obj.updateClient = function(data) {
		return $http.post(path + "updateClient", data);
	}
	obj.getLogins = function() {
		return $http.get(path + "getLogins");
	}
	obj.loginUser = function(user,pass) {
		return $http.get(path + "loginUser?user=" + user + "&pass=" + pass);
	}
	obj.getUsers = function() {
		return $http.get(path + "getUsers");
	}
	obj.commitChanges = function(data) {
		return $http.post(path + "commitChanges", data);
	}
	return obj;	 
}]);