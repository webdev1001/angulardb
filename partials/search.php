<div class="search-container"><div class="search-container-inner"><h1 ng-if="q.$"><i class="glyphicon glyphicon-search"></i></h1><input id="search" type="search" ng-model="q.$" value="" placeholder="start typing..." ng-style="q.$ &amp;&amp; {'margin-top': '3%'} || !q.$ &amp;&amp; {'margin-top': '20%'}" ng-class="q.$ &amp;&amp; test" autofocus="autofocus" class="search form-control"/><div ng-show="q.$" class="row center-justify shrunk"><label>show&nbsp;</label><select ng-model="quantity" class="form-control tenth center"><option>5</option><option selected="selected">10</option><option>25</option><option>50</option><option>75</option><option>100</option><option>150</option><option>200</option><option>300</option><option>400</option><option>500</option><option>1000</option></select></div><div class="row three-fourths center"><div ng-if="q.$" ng-controller="searchResultsController" class="results-container"><tabset><tab heading="clients"><table class="table table-hover table-condensed center"><thead><tr><th class="col-md-1">#</th><th class="col-md-9">Client Name</th><th class="col-md-1">Sites</th><th class="col-md-1"></th></tr></thead><tbody><tr ng-repeat="client in clients | filter:q:strict | limitTo:quantity"><td ng-if="client.id.toLowerCase().indexOf(q.$.toLowerCase()) != -1" class="col-md-1 success">{{client.id}}</td><td ng-if="client.id.toLowerCase().indexOf(q.$.toLowerCase()) == -1" class="col-md-1">{{client.id}}</td><td ng-if="client.name.toLowerCase().indexOf(q.$.toLowerCase()) != -1" class="col-md-9 success">{{client.name}}</td><td ng-if="client.name.toLowerCase().indexOf(q.$.toLowerCase()) == -1" class="col-md-9">{{client.name}}</td><td class="col-md-1">{{client.sites.length}}</td><td class="col-md-1"><div ng-controller="clientDetailsModalController" class="right"><button ng-click="open(client)" tooltip="Click for detailed information about {{client.name}}'s account." tooltip-placement="left" class="btn btn-primary"><i class="glyphicon glyphicon-search"></i>&nbsp;</button><script type="text/ng-template" id="myModalContent.html"><div class="modal-header"><h2><i class="glyphicon glyphicon-list-alt"></i> {{client.name}}</h2><p class="center-justify">Click on any field to copy it to the clipboard. Press ESC to close this window.</p></div><div class="modal-body"><tabset><tab heading="Websites" ng-controller="collapseController"><h4 class="center-justify no-padding"><i class="glyphicon glyphicon-list"></i> Websites</h4><table class="table table-striped table-hover table-condensed center sites-table"><thead><tr><th class="col-md-1">#</th><th class="col-md-3">Name</th><th class="col-md-7">URL</th><th class="col-md-1"></th></tr></thead><tbody><tr ng-repeat="site in client.sites"><td class="col-md-1">{{site.id}}</td><td class="col-md-3">{{site.name}}</td><td class="col-md-7">{{site.url}}<div collapse="isCollapsed" class="collapsed"><br/><div class="row head shrunk"><div class="col-md-3">Type</div><div class="col-md-3">Connection</div><div class="col-md-3">Username</div><div class="col-md-3">Password</div></div><div ng-repeat="login in site.logins.types track by $index" class="row body shrunk"><div ng-controller="dataCopyController" tooltip="Click any field to select. Click again to deselect." tooltip-placement="left" class="body-wrapper"><div ng-click="toggleInput($event)" class="col-md-3">{{site.logins.types[$index] != null ? site.logins.types[$index] : "n/a"}}</div><div ng-click="toggleInput($event)" class="col-md-3">{{site.logins.connections[$index] != null ? site.logins.connections[$index] : "n/a"}}</div><div ng-click="toggleInput($event)" class="col-md-3">{{site.logins.usernames[$index] != null ? site.logins.usernames[$index] : "n/a"}}</div><div ng-click="toggleInput($event)" class="col-md-3">{{site.logins.passwords[$index] != null ? site.logins.passwords[$index] : "n/a"}}</div></div></div><br/></div></td><td class="col-md-1 right-justify"><button ng-click="isCollapsed = !isCollapsed" class="btn btn-default toggle"><i ng-if="isCollapsed" class="glyphicon glyphicon-chevron-down"></i><i ng-if="!isCollapsed" class="glyphicon glyphicon-chevron-up"></i></button></td></tr></tbody></table></tab><tab heading="Logins"><h4 class="center-justify no-padding"><i class="glyphicon glyphicon-log-in"></i> Logins</h4><table ng-repeat="site in client.sites track by $index" class="table table-striped table-hover table-condensed center sites-table"><thead><tr><th>{{site.name}}</th></tr></thead><tbody><tr><td><br/><div class="row head shrunk"><div class="col-md-3 not-padded">Type</div><div class="col-md-3 not-padded">Connection</div><div class="col-md-3 not-padded">Username</div><div class="col-md-3 not-padded">Password</div></div><div ng-repeat="login in site.logins.types track by $index" class="row body shrunk"><div ng-controller="dataCopyController" class="body-wrapper"><div ng-click="toggleInput($event)" class="col-md-3 padded">{{site.logins.types[$index] != null ? site.logins.types[$index] : "n/a"}}</div><div ng-click="toggleInput($event)" class="col-md-3 padded">{{site.logins.connections[$index] != null ? site.logins.connections[$index] : "n/a"}}</div><div ng-click="toggleInput($event)" class="col-md-3 padded">{{site.logins.usernames[$index] != null ? site.logins.usernames[$index] : "n/a"}}</div><div ng-click="toggleInput($event)" class="col-md-3 padded">{{site.logins.passwords[$index] != null ? site.logins.passwords[$index] : "n/a"}}</div></div></div><br/></td></tr></tbody></table></tab></tabset></div><div class="modal-footer"><button ng-click="ok()" class="btn btn-primary">OK</button><br/><div class="row"><div class="col-md-12 center-justify"><img src="img/hrwlogo1.png"/></div></div></div></script></div></td></tr></tbody></table></tab><tab heading="web sites"><div ng-repeat="client in clients | filter:q:strict | limitTo:quantity" ng-controller="collapseController"><h4>{{client.name}}</h4><table ng-if="client.sites.length &gt; 0" class="table table-striped table-hover table-condensed center sites-table"><theads><tr><th class="col-md-1">#</th><th class="col-md-3">Name</th><th class="col-md-7">URL</th><th class="col-md-1"></th></tr></theads><tbody><tr ng-repeat="site in client.sites"><td class="col-md-1">{{site.id}}</td><td class="col-md-3">{{site.name}}</td><td class="col-md-7">{{site.url}}<div collapse="isCollapsed" class="collapsed"><br/><div class="row head shrunk"><div class="col-md-3">Type</div><div class="col-md-3">Connection</div><div class="col-md-3">Username</div><div class="col-md-3">Password</div></div><div ng-repeat="login in site.logins.types track by $index" class="row body shrunk"><div ng-controller="dataCopyController" tooltip="Click any field to select. Click again to deselect." tooltip-placement="left" class="body-wrapper"><div ng-click="toggleInput($event)" class="col-md-3">{{site.logins.types[$index] != null ? site.logins.types[$index] : "n/a"}}</div><div ng-click="toggleInput($event)" class="col-md-3">{{site.logins.connections[$index] != null ? site.logins.connections[$index] : "n/a"}}</div><div ng-click="toggleInput($event)" class="col-md-3">{{site.logins.usernames[$index] != null ? site.logins.usernames[$index] : "n/a"}}</div><div ng-click="toggleInput($event)" class="col-md-3">{{site.logins.passwords[$index] != null ? site.logins.passwords[$index] : "n/a"}}</div></div></div><br/></div></td><td class="col-md-1 right-justify"><button ng-click="isCollapsed = !isCollapsed" class="btn btn-default toggle"><i ng-if="isCollapsed" class="glyphicon glyphicon-chevron-down"></i><i ng-if="!isCollapsed" class="glyphicon glyphicon-chevron-up"></i></button></td></tr></tbody></table></div></tab><tab heading="logins"><div ng-repeat="client in clients | filter:q:strict | limitTo:quantity"><table ng-repeat="site in client.sites track by $index" class="table table-striped table-hover table-condensed center sites-table"><thead><tr><th>{{client.name}} | {{site.name}}</th></tr></thead><tbody><tr><td><br/><div class="row head shrunk"><div class="col-md-3 not-padded">Type</div><div class="col-md-3 not-padded">Connection</div><div class="col-md-3 not-padded">Username</div><div class="col-md-3 not-padded">Password</div></div><div ng-repeat="login in site.logins.types track by $index" class="row body shrunk"><div ng-controller="dataCopyController" class="body-wrapper"><div ng-click="toggleInput($event)" class="col-md-3 padded">{{site.logins.types[$index] != null ? site.logins.types[$index] : "n/a"}}</div><div ng-click="toggleInput($event)" class="col-md-3 padded">{{site.logins.connections[$index] != null ? site.logins.connections[$index] : "n/a"}}</div><div ng-click="toggleInput($event)" class="col-md-3 padded">{{site.logins.usernames[$index] != null ? site.logins.usernames[$index] : "n/a"}}</div><div ng-click="toggleInput($event)" class="col-md-3 padded">{{site.logins.passwords[$index] != null ? site.logins.passwords[$index] : "n/a"}}</div></div></div><br/></td></tr></tbody></table></div></tab></tabset><h3>test</h3></div></div></div></div>