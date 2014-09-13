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
	obj.User = function (name, names, email, phone, title) {
		this.name = name ? name : "";
		this.names = names ? names : {
			first: "",
			last: ""
		};
		this.email = email ? email : "";
		this.phone = phone ? phone : "";
		this.title = title ? title : "";
	}
	return obj;
}]);