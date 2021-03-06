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
	}
	obj.Client.prototype.clone = function (client) {
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
		var i = client.sites.length;
		while (i--) {
			this.sites[i] = new obj.Site();
			this.sites[i].clone(client.sites[i]);
		}
		this.messages = client.messages;
		this.category = client.category;
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
	obj.Site.prototype.clone = function (site) {
		this.id = site.id;
		this.name = site.name;
		this.url = site.url;
		var i = site.logins.types.length;
		while (i--) {
			this.logins.types[i] = site.logins.types[i];
			this.logins.ids[i] = site.logins.ids[i];
			this.logins.connections[i] = site.logins.connections[i];
			this.logins.usernames[i] = site.logins.usernames[i];
			this.logins.passwords[i] = site.logins.passwords[i];
		}
		this.category = site.category;
	};
	obj.User = function (id, name, names, email, phone, title, level, authenticated, pic) {
		this.authenticated = authenticated ? authenticated : false;
		this.level = level ? level : "guest";
		this.id = id ? id : -1;
		this.name = name ? name : "";
		this.names = names ? names : {
			first: "",
			last: ""
		};
		this.email = email ? email : "";
		this.phone = phone ? phone : "";
		this.title = title ? title : "";
		this.pic = pic ? pic : "";
		this.authenticate = function () { return this.authenticated; }
	}
	obj.User.prototype.copy = function (user) {
		this.level = user.level;
		this.id = user.id;
		this.name = user.name;
		this.names = {
			first: user.names.first,
			last: user.names.last
		};
		this.email = user.email;
		this.phone = user.phone;
		this.title = user.title;
		this.pic = user.pic;
		this.authenticated = user.authenticated;
	}
	obj.User.prototype.hasAccess = function (accessLevel) {
		var levels = ["guest", "user", "dev", "admin"];
		if (levels.indexOf(this.level) != -1) {
			if (levels.indexOf(this.level) >= levels.indexOf(accessLevel)) return true;
		}
		return false;
	}
	obj.Revision = function (revisionId, clientId, user, date, dataJSON) {
		this.revisionId = revisionId ? revisionId : -1;
		this.clientId = clientId ? clientId : -1;
		this.user = user ? user : "";
		this.date = date ? date : "";
		this.dataJSON = dataJSON ? dataJSON : "";
	}
	obj.Revision.prototype.clone = function (revision) {
		this.revisionId = revision.revisionId;
		this.clientId = revision.clientId;
		this.user = revision.user;
		this.date = revision.date;
		this.dataJSON = revision.dataJSON;
	}
	return obj;
}]);