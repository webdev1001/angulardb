<div ng-if="!clients" class="spinner center-justify"><img src="img/spinner.gif" alt="initializing..."/></div><div ng-if="clients" class="search-container"><div class="search-container-inner"><h1 ng-if="q.$"><i class="glyphicon glyphicon-search"></i> beta</h1><input id="search" type="search" ng-model="q.$" value="" placeholder="start typing..." ng-style="q.$ &amp;&amp; {'margin-top': '3%'} || !q.$ &amp;&amp; {'margin-top': '20%'}" autofocus="autofocus" class="search form-control"/><div ng-if="q.$" class="row three-fourths center"><div ng-controller="searchController" class="results-container"><div class="row center-justify"><label>show</label>&nbsp;<input type="number" min="1" value="{{quantity}}" ng-model="quantity" ng-maxlength="4" class="form-control quantity"/>&nbsp;results | has admin access: {{currentUser.hasAccess("admin")}} | {{currentUser.level}}</div><tabset><tab heading="clients" ng-if="currentUser.hasAccess('dev')"><table class="table table-hover table-condensed center"><thead><tr><th ng-click="sort('id')" class="col-md-1 clickable">#</th><th ng-click="sort('name')" class="col-md-8 clickable">Client Name</th><th ng-click="sort('sites')" class="col-md-1 clickable">Sites</th><th class="col-md-2 clickable"></th></tr></thead><tbody><tr ng-repeat="client in clients | filter:q:strict | limitTo:quantity" ng-init="update()"><td ng-if="client.id.toLowerCase().indexOf(q.$.toLowerCase()) != -1" class="col-md-1 success">{{client.id}}</td><td ng-if="client.id.toLowerCase().indexOf(q.$.toLowerCase()) == -1" class="col-md-1">{{client.id}}</td><td ng-if="client.name.toLowerCase().indexOf(q.$.toLowerCase()) != -1" class="col-md-8 success">{{client.name}}</td><td ng-if="client.name.toLowerCase().indexOf(q.$.toLowerCase()) == -1" class="col-md-8">{{client.name}}</td><td class="col-md-1">{{client.sites.length}}</td><td class="col-md-2"><div ng-controller="clientListModalsController" class="right"><div tooltip="Edit or view the details of {{client.name}}'s account." tooltip-placement="left" class="btn-group"><button ng-if="currentUser.hasAccess('admin')" ng-click="edit(client)" class="btn btn-primary"><i class="glyphicon glyphicon-edit"></i>&nbsp;</button><button ng-click="view(client)" class="btn btn-primary"><i class="glyphicon glyphicon-search"></i>&nbsp;</button><script type="text/ng-template" id="clientDetailsModal.html"><div class="modal-header"><h2><i class="glyphicon glyphicon-list-alt"></i> {{client.name}}</h2><p class="center-justify">Click on any field to copy it to the clipboard. Press ESC to close this window.</p></div><div class="modal-body"><tabset><tab heading="Websites"><h4 class="center-justify no-padding"><i class="glyphicon glyphicon-list"></i> Websites</h4><table class="table table-striped table-hover table-condensed center sites-table"><thead><tr><th class="col-md-1">#</th><th class="col-md-3">Name</th><th class="col-md-7">URL</th><th class="col-md-1"></th></tr></thead><tbody><tr ng-repeat="site in client.sites"><td class="col-md-1"><span toggle-input="toggle-input">{{site.id}}</span></td><td class="col-md-3"><span toggle-input="toggle-input">{{site.name || "None provided." }}</span></td><td class="col-md-7"><span toggle-input="toggle-input">{{site.url || site.logins.usernames[0] + ":" + site.logins.passwords[0] + "@" + site.logins.connections[0] + ", etc. (" + site.logins.connections.length + " total)"}}</span><div collapse="isCollapsed" class="collapsed"><br/><div class="row head shrunk"><div class="col-md-3">Type</div><div class="col-md-3">Connection</div><div class="col-md-3">Username</div><div class="col-md-3">Password</div></div><div ng-repeat="login in site.logins.types track by $index" class="row body shrunk"><div tooltip="Click any field to select. Click again to deselect." tooltip-placement="left" class="body-wrapper"><div toggle-input="toggle-input" class="col-md-3">{{site.logins.types[$index] != null ? site.logins.types[$index] : "n/a"}}</div><div toggle-input="toggle-input" class="col-md-3">{{site.logins.connections[$index] != null ? site.logins.connections[$index] : "n/a"}}</div><div toggle-input="toggle-input" class="col-md-3">{{site.logins.usernames[$index] != null ? site.logins.usernames[$index] : "n/a"}}</div><div toggle-input="toggle-input" class="col-md-3">{{site.logins.passwords[$index] != null ? site.logins.passwords[$index] : "n/a"}}</div></div></div><br/></div></td><td class="col-md-1 right-justify"><button ng-click="isCollapsed = !isCollapsed" class="btn btn-default toggle"><i ng-if="isCollapsed" tooltip="More on {{site.name}}" tooltip-placement="left" class="glyphicon glyphicon-chevron-down"></i><i ng-if="!isCollapsed" tooltip="Less on {{site.name}}" tooltip-placement="left" class="glyphicon glyphicon-chevron-up"></i></button></td></tr></tbody></table></tab><tab heading="Logins"><h4 class="center-justify no-padding"><i class="glyphicon glyphicon-log-in"></i> Logins</h4><table ng-repeat="site in client.sites track by $index" class="table table-striped table-hover table-condensed center sites-table"><thead><tr><th>{{site.name || site.logins.connections[0] + ", etc."}} | {{client.name}}</th></tr></thead><tbody><tr><td><br/><div class="row head shrunk"><div class="col-md-3 not-padded">Type</div><div class="col-md-3 not-padded">Connection</div><div class="col-md-3 not-padded">Username</div><div class="col-md-3 not-padded">Password</div></div><div ng-repeat="login in site.logins.types track by $index" class="row body shrunk"><div class="body-wrapper"><div toggle-input="toggle-input" class="col-md-3 padded">{{site.logins.types[$index] != null ? site.logins.types[$index] : "n/a"}}</div><div toggle-input="toggle-input" class="col-md-3 padded">{{site.logins.connections[$index] != null ? site.logins.connections[$index] : "n/a"}}</div><div toggle-input="toggle-input" class="col-md-3 padded">{{site.logins.usernames[$index] != null ? site.logins.usernames[$index] : "n/a"}}</div><div toggle-input="toggle-input" class="col-md-3 padded">{{site.logins.passwords[$index] != null ? site.logins.passwords[$index] : "n/a"}}</div></div></div><br/></td></tr></tbody></table></tab></tabset></div><div class="modal-footer"><button ng-click="ok()" class="btn btn-primary">OK</button><br/><div class="row"><div class="col-md-12 center-justify"><img src="img/hrwlogo1.png"/></div></div></div></script><script type="text/ng-template" id="clientEditModal.html"><form role="form" novalidate="novalidate"><div class="modal-header"><h2><i class="glyphicon glyphicon-list-alt"></i> {{client.name}}</h2><button type="submit" ng-click="submit()" class="btn btn-warning">Submit Changes</button><button ng-click="ok()" class="btn btn-primary">Done</button><img ng-if="status.loaded == false" src="img/spinner.gif" class="spinner-small inline-block"/><span ng-if="status.text"><i class="glyphicon glyphicon-ok"></i></span></div><div class="modal-body"><div class="row"><div class="col-md-12"><h3>Client Details</h3></div></div><div class="row form-group"><div class="col-md-6"><label for="editID">ID</label><input id="editID" ng-model="client.id" class="form-control"/><label for="editName">Name</label><input id="editName" ng-model="client.name" class="form-control"/></div><div class="col-md-6"><label for="editDescription">Description</label><textarea id="editDescription" ng-model="client.description" class="form-control tall"></textarea></div></div><div class="row"><div class="col-md-12"><h3>Web Sites</h3></div></div><div ng-if="client.sites" ng-repeat="site in client.sites track by $index" class="row"><div class="row"><div class="col-md-12"><h4>{{sites[$index].name}}</h4></div></div><div class="row form-group"><div class="col-md-6"><label for="siteName">ID</label><input id="siteID" ng-model="sites[$index].id" class="form-control"/><label for="siteName">Name</label><input id="siteName" ng-model="sites[$index].name" class="form-control"/></div><div class="col-md-6"><label for="siteName">URL</label><input id="siteURL" ng-model="sites[$index].url" class="form-control"/></div></div><div ng-if="site.logins.types" ng-repeat="login in site.logins.types track by $index" class="row"><div class="col-md-2">{{login}}</div><div class="col-md-10"><label for="loginType">Type</label><input id="loginType" ng-model="sites[$parent.$parent.$index].logins.types[$index]" class="form-control"/><label for="loginConnection">Connection</label><input id="loginConnection" ng-model="sites[$parent.$parent.$index].logins.connections[$index]" class="form-control"/><label for="loginUsername">Username</label><input id="loginUsername" ng-model="sites[$parent.$parent.$index].logins.usernames[$index]" class="form-control"/><label for="loginPassword">Password</label><input id="loginPassword" ng-model="sites[$parent.$parent.$index].logins.passwords[$index]" class="form-control"/></div></div></div></div><div class="modal-footer"><img ng-if="status.loaded == false" src="img/spinner.gif" class="spinner-small inline-block"/><span ng-if="status.text"><i class="glyphicon glyphicon-ok"></i></span><button type="submit" ng-click="submit()" class="btn btn-warning">Submit Changes</button><button ng-click="ok()" class="btn btn-primary">Done</button><br/><div class="row"><div class="col-md-12 center-justify"><img src="img/hrwlogo1.png"/></div></div></div></form></script></div></div></td></tr></tbody></table></tab><tab heading="web sites" ng-if="currentUser.hasAccess('dev')"><div ng-repeat="client in clients | filter:q:strict | limitTo:quantity"><h4 ng-if="client.sites.length &gt; 0">{{client.name}}</h4><table ng-if="client.sites.length &gt; 0 &amp;&amp; client.sites.toLowerCase().indexOf(q.$.toLowerCase()) != -1" class="table table-striped table-hover table-condensed center sites-table"><theads><tr><th class="col-md-1">#</th><th class="col-md-3">Name</th><th class="col-md-7">URL</th><th class="col-md-1"></th></tr></theads><tbody><tr ng-repeat="site in client.sites | filter:q:strict | limitTo:quantity"><td class="col-md-1"><span toggle-input="toggle-input">{{site.id}}</span></td><td class="col-md-3"><span toggle-input="toggle-input">{{site.name || "None provided."}}</span></td><td class="col-md-7"><span toggle-input="toggle-input">{{site.url || site.logins.usernames[0] + ":" + site.logins.passwords[0] + "@" + site.logins.connections[0] + ", etc. (" + site.logins.connections.length + " total)"}}</span><div collapse="isCollapsed" class="collapsed"><br/><div class="row head shrunk"><div class="col-md-3">Type</div><div class="col-md-3">Connection</div><div class="col-md-3">Username</div><div class="col-md-3">Password</div></div><div ng-repeat="login in site.logins.types track by $index" class="row body shrunk"><div tooltip="Click any field to select. Click again to deselect." tooltip-placement="left" class="body-wrapper"><div toggle-input="toggle-input" class="col-md-3">{{site.logins.types[$index] != null ? site.logins.types[$index] : "n/a"}}</div><div toggle-input="toggle-input" class="col-md-3">{{site.logins.connections[$index] != null ? site.logins.connections[$index] : "n/a"}}</div><div toggle-input="toggle-input" class="col-md-3">{{site.logins.usernames[$index] != null ? site.logins.usernames[$index] : "n/a"}}</div><div toggle-input="toggle-input" class="col-md-3">{{site.logins.passwords[$index] != null ? site.logins.passwords[$index] : "n/a"}}</div></div></div><br/></div></td><td class="col-md-1 right-justify"><button ng-click="isCollapsed = !isCollapsed" class="btn btn-default toggle"><i ng-if="isCollapsed" class="glyphicon glyphicon-chevron-down"></i><i ng-if="!isCollapsed" class="glyphicon glyphicon-chevron-up"></i></button></td></tr></tbody></table></div></tab><tab heading="logins" ng-if="currentUser.hasAccess('dev')"><div ng-repeat="client in clients | filter:q:strict | limitTo:quantity"><table ng-repeat="site in client.sites track by $index" class="table table-striped table-hover table-condensed center sites-table"><thead><tr><th>{{site.url || site.logins.usernames[0] + ":" + site.logins.passwords[0] + "@" + site.logins.connections[0] + ", etc. (" + site.logins.connections.length + " total)"}} | {{client.name}}</th></tr></thead><tbody><tr><td><br/><div class="row head shrunk"><div class="col-md-3 not-padded">Type</div><div class="col-md-3 not-padded">Connection</div><div class="col-md-3 not-padded">Username</div><div class="col-md-3 not-padded">Password</div></div><div ng-repeat="login in site.logins.types track by $index | filter:q:strict | limitTo:quantity" class="row body shrunk"><div class="body-wrapper"><div toggle-input="toggle-input" class="col-md-3 padded">{{site.logins.types[$index] != null ? site.logins.types[$index] : "n/a"}}</div><div toggle-input="toggle-input" class="col-md-3 padded">{{site.logins.connections[$index] != null ? site.logins.connections[$index] : "n/a"}}</div><div toggle-input="toggle-input" class="col-md-3 padded">{{site.logins.usernames[$index] != null ? site.logins.usernames[$index] : "n/a"}}</div><div toggle-input="toggle-input" class="col-md-3 padded">{{site.logins.passwords[$index] != null ? site.logins.passwords[$index] : "n/a"}}</div></div></div><br/></td></tr></tbody></table></div></tab><tab heading="people" ng-if="currentUser.hasAccess('user')"><table ng-controller="userController" class="table table-hover table-condensed center"><thead><tr><th class="col-md-3">Name</th><th class="col-md-3">Title</th><th class="col-md-3">Email</th><th class="col-md-3">Phone</th></tr></thead><tbody><tr ng-repeat="user in users | filter:q:strict "><td class="col-md-3">{{user.names.first}} {{user.names.last}} ({{user.name}})</td><td class="col-md-3">{{user.title}}</td><td class="col-md-3">{{user.email}}</td><td class="col-md-3">{{user.phone}}</td></tr></tbody></table></tab></tabset><div class="row center-justify"><button ng-if="results &lt; clients.length" ng-click="showMore(quantity)" class="btn btn-primary">show {{quantity}} more</button></div></div></div></div></div>