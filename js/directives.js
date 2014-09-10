var uiDirectives = angular.module("uiDirectives", []);

uiDirectives.directive("toggleInput", function() {
	return function (scope, element, attr) {
		element.on("mousedown", function (event) {
			e = event.target;
			if (e.tagName != "INPUT" && e.innerText) {
				e.innerHTML = "<input type='text' value='"+e.innerText+"' style='width:100%''>";
				e.getElementsByTagName("input")[0].select();
			} else if (e.tagName === "INPUT") {
				e.parentNode.innerHTML = e.value; //e.getAttribute("value");
			}
		});
	};
});

uiDirectives.directive("listAttributes", function() {
	return function (scope, element, attr) {
		function iterateOverNestedObject (obj) {
			var category = obj["category"];
			if (category === "site") sites.push(obj);
			else if (category === "login") logins.push(obj);
			for (var prop in obj) {
				var value = obj[prop];
				if (typeof value === "object") {
					iterateOverNestedObject(value);
				}
			}
		}
		var obj = scope.client;
		var sites = [];
		var logins = [];
		var result = {};
		result["sites"] = {};
		for (var prop in obj) {
			if (prop !== "category" && prop !== "$$hashKey") {
				var value = obj[prop];
				if (typeof value === "object") {
					iterateOverNestedObject(value);
				} else {
					if (typeof value === "string") {
						//var label = "<label class='listed-attribute-input-label' for='"+prop+"'>"+prop.charAt(0).toUpperCase()+prop.slice(1)+"</label>";
						//var input = "<input class='listed-attribute-input' type='text' name='"+prop+"' value='"+value+"'>";
						//if (prop === "description") input = "<textarea class='listed-attribute-input'name='"+prop+"'>" + value + "</textarea>";
						//element.parent().append(label);
						//element.parent().append(input);
						result[""+prop+""] = value;
					}
				}
			}
		}
		//element.parent().append("<hr>");
		i = sites.length;
		while (i--) {
			var site = sites[i];
			site.category = "site";
			result["sites"][""+site.name+""] = site;
			//element.parent().append("<h4>"+site.name+"</h4>");
		}
		console.log("Result: ", result);
		console.log("Sites: ", sites.length);
		console.log("Logins: ", logins.length);
		scope.edit = result;
	}
})