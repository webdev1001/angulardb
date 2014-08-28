var searchDirectives = angular.module("searchDirectives", []);

searchDirectives.directive("searchListDirective", function () {
	return function(scope) {
		console.log("what");
	};
});