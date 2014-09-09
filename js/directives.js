var searchDirectives = angular.module("searchDirectives", []);

searchDirectives.directive("searchListDirective", function () {
	return function(scope) {
		console.log("what");
	};
});

var uiDirectives = angular.module("uiDirectives", []);

uiDirectives.directive("toggleInput", function() {
	return function (scope, element, attr) {
		element.on("mousedown", function (event) {
			e = event.target;
			if (e.tagName != "INPUT" && e.innerText) {
				e.innerHTML = "<input type='text' value='"+e.innerText+"' style='width:100%''>";
				e.getElementsByTagName("input")[0].select();
			} else if (e.tagName === "INPUT") {
				e.parentNode.innerHTML = e.getAttribute("value");
			}
		});
	};
});