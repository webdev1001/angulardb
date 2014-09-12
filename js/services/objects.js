objServices.factory("objects", [function(){
	var obj = {};
	obj.Client = function (id, name, description, authors, dates, sites, messages, category) {
		this.id = id ? id : -1;
		this.name = name ? name : "nope";
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
		this.clone = function (client) {
			this.id = client.id;
			this.name = client.name;
			this.description = client.description;
			this.authors = {
				first: client.authors.first,
				last: client.authors.last
			};
			this.dates = {
				created: client.dates.created,
				modified: client.dates.modified
			};
			this.sites = client.sites;
			this.messages = client.messages;
			this.category = client.category;
		}
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