<div ng-controller="authenticationController" class="login-container"><h2 class="center-justify">login</h2><div class="row center-justify form-group"><form><br/><input type="text" placeholder="username" ng-model="u.name" autofocus="autofocus" class="form-control tenth center"/><input type="password" placeholder="password" ng-model="u.pass" class="form-control tenth center"/><br/><div role="alert" ng-if="message.text" class="message alert {{message.type}}">{{message.text}}</div><br/><div class="controls"><button type="submit" ng-click="login()" class="btn btn-primary">let's go</button><div ng-if="message.text" class="help"><button ng-click="isCollapsed = !isCollapsed" class="btn btn-warning">help</button><div collapse="isCollapsed" class="collapsed"><div class="content"><p>Your username is your High Rank username. For security reasons, it is not the same as your email address.</p><p>If you have forgotten your username, please contact an administrator.</p></div></div></div></div></form></div></div>