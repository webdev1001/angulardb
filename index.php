<!DOCTYPE html><!--if lt IE 7html(class="no-js lt-ie9 lt-ie8 lt-ie7", lang="en", ng-app="searchApp")--><!--if IE 7html(class="no-js lt-ie9 lt-ie8", lang="en", ng-app="searchApp")--><!--if IE 8html(class="no-js lt-ie9", lang="en", ng-app="searchApp")--><!-- [if gt IE 8] <!--><html lang="en" ng-app="searchApp" class="no-js"><!-- <![endif]--><head><title>ci v2</title><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap-theme.css"><link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.css"><link rel="stylesheet" href="stylesheets/screen.css"><link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,400,700,300"></head><body><!--if lt IE 7p.browsehappy!="ou are using an <strong>outdated</strong> browser. Please <a href='http://browsehappy.com/'>upgrade your browser</a> to improve your experience."--><!--[endif]--><header><div ng-controller="loginController" class="row"><div class="col-md-10"></div><div ng-if="authenticated" class="col-md-2"><button ng-click="logout()" class="btn btn-primary">Log Out ({{currentUser.name}})</button></div></div></header><div ui-view></div><div class="copyright center-justify"><img src="img/hrwlogo1.png"><p toggle-input>Copyright &copy; 2014 High Rank Websites, Inc.</p></div><script src="bower_components/angular/angular.js"></script><script src="bower_components/angular-route/angular-route.js"></script><script src="bower_components/angular-cookie/angular-cookie.min.js"></script><script src="bower_components/angular-md5/angular-md5.js"></script><script src="bower_components/ui-router/release/angular-ui-router.js"></script><script src="bower_components/angular-bootstrap/ui-bootstrap-tpls.js"></script><script src="bower_components/jquery/dist/jquery.js"></script><script src="js/vendor/sha1.js"></script><script src="js/controllers/main.js"></script><script src="js/controllers/search.js"></script><script src="js/controllers/authentication.js"></script><script src="js/controllers/modals.js"></script><script src="js/controllers/users.js"></script><script src="js/directives.js"></script><script src="js/services.js"></script><script src="js/app.js"></script></body></html>