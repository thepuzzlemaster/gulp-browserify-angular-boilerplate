var angular = require('angular');
var config = require('./config');
var navbar = require('./components/navbar/navbar.js');

angular.module('app', [
  'templates', // container for templates from ngHtml2Js gulp task
  'app.navbar'
])
.constant('configUrls', config.urls); // make urls accessible in all modules
