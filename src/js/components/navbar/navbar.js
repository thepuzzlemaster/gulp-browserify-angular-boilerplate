var navbarDirective = require('./navbar-directive');
var navbarTabDirective = require('./navbar-directive.tab');
var navbarService = require('./navbar-service');

angular.module('app.navbar', [
  'app.navbar.service',
  'app.navbar.directive',
  'app.navbar.directive.tab'
]);
