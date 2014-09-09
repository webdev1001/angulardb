var authControllers = angular.module("authControllers", []);

var uiControllers = angular.module("uiControllers", []);

uiControllers.controller("collapseController", function ($scope) {
	$scope.isCollapsed = true;
});