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