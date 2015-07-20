angular.module('app.navbar.directive.tab', [])
.directive('rexNavbarTab', function() {

  return {
    restrict: 'A',
    scope: {
      tab: '=rexNavbarTab'
    },
    require: '^rexNavbar',
    link: function(scope, element, attrs, parentController) {
      element.on('click', function(event) {
        scope.$apply(function() {
          parentController.setActive(scope.tab);
        });
      });
    }
  }
});
