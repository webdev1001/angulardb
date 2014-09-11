var utlServices = angular.module("utlServices", []);
var objServices = angular.module("objServices", []);
var apiServices = angular.module("apiServices", []);

utlServices.factory("utilities", [function() {
	var obj = {};
	obj.explode = function (o,d,pfx) {
		pfx = pfx ? pfx : "l_";
		for (var prop in o) {
			p = o[prop];
			if (typeof p === "string" && prop.indexOf(pfx) != -1) o[prop] = o[prop].split(d);
		}
		return o;
	}
	return obj;
}]);

objServices.factory("objects", [function(){
	var obj = {};
	obj.Client = function (id, name, description, authors, dates, sites, messages, category) {
		this.id = id ? id : -1;
		this.name = name ? name : "";
		this.description = description ? description : "";
		this.authors = authors ? authors : {
			first: "",
			last: ""
		};
		this.dates = dates ? dates : {
			created: "",
			modified: ""
		}
		this.sites = sites ? sites : [];
		this.messages = messages ? messages : [];
		this.category = category ? category : "client";
	}
	obj.Site = function (id, name, url, logins, category) {
		this.id = id ? id : -1;
		this.name = name ? name : "";
		this.url = url ? url : "";
		this.logins = logins ? logins : {
			ids: [],
			types: [],
			connections: [],
			usernames: [],
			passwords: [],
			category: "login"
		};
		this.category = category ? category : "site";
	}
	return obj;
}]);

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
	obj.commitChanges = function(data) {
		return $http.post(serviceBase + "commitChanges", data);
	}
	return obj;	 
}]);